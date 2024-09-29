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

interface IVerifyStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyStep = ({ setStep, setIsLoading, email }: IVerifyStep) => {
  const [code, setCode] = useState('');

  const router = useRouter();
  const [signUp] = useSignUpMutation({
    variables: { email },
  });

  const [verify] = useVerifyMutation({
    onError(error) {
      const { message } = error;
      toast.error(message);
    },
    onCompleted({ verify: { accessToken } }) {
      console.log(accessToken);
      const now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      setCookie('accessToken', accessToken, { expires: now });
      if (accessToken) {
        router.push(`/?tab=Shop`);
      }
    },
  });

  useEffect(() => {
    if (code.length === 6) {
      verify({ variables: { code, email } });
    }
  }, [code]);

  async function resendCode() {
    try {
      toast.success(`We send you a new code to ${email}`);
    } catch (error: any) {
      const { message } = error;
      return toast.error(message);
    } finally {
      setIsLoading(false);
    }
    await signUp();
  }

  return (
    <>
      <Text align="center" mb="8px" fontWeight="bold">
        Please enter your verification code
      </Text>
      <ReactCodeInput
        name="veriyf"
        inputMode="numeric"
        type="number"
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
