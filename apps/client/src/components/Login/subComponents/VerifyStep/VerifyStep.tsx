import React, { useEffect, useState } from 'react';
import { Step } from '../../Login';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button, Text } from '@chakra-ui/react';
import {
  useSignUpMutation,
  useVerifyMutation,
} from '../../../../graphql/generated';

import ReactCodeInput from 'react-code-input';
import { ACCESS_TOKEN } from '../../../../constants/cookies';

interface IVerifyStep {
  email: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyStep = ({ setIsLoading, email }: IVerifyStep) => {
  const [code, setCode] = useState('');

  const router = useRouter();
  const [signUp] = useSignUpMutation({
    variables: { email },
    onError(error) {
      const { message } = error;
      return toast.error(message);
    },
  });

  const [verify] = useVerifyMutation({
    onError(error) {
      const { message } = error;
      toast.error(message);
      setIsLoading(false);
    },
    onCompleted({ verify: { accessToken } }) {
      if (accessToken) {
        const now = new Date();
        now.setTime(now.getTime() + 1 * 3600 * 1000);
        setCookie(ACCESS_TOKEN, accessToken, { expires: now });
        router.push(`/?tab=Shop`);
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (code.length === 6) {
      verify({ variables: { code, email } });
    }
  }, [code]);

  async function resendCode() {
    await signUp();
  }

  return (
    <>
      <Text align="center" mb="8px" fontWeight="bold">
        Please enter your verification code
      </Text>
      <ReactCodeInput
        name="verify"
        inputMode="numeric"
        fields={6}
        onChange={setCode}
      />
      <Text onClick={resendCode} cursor="pointer" align="center" mb="8px">
        Didn&apos;t work? Send me another code.
      </Text>
      <Button
        width="100%"
        colorScheme="orange"
        type="submit"
        onClick={async () => await verify({ variables: { code, email } })}
      >
        VERIFY
      </Button>
    </>
  );
};

export default VerifyStep;
