import React, { useEffect, useRef, useState } from 'react';
import { Step } from '../../Login';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Input, Button, Text, HStack } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import {
  MessageResponse,
  MutationSignUpArgs,
  MutationVerifyArgs,
  VerifyResponse,
} from '../../../../graphql/generated';
import { signUpMutation } from '../../../../graphql/mutations/auth';

interface IVerifyStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyStep = ({ setStep, setIsLoading, email }: IVerifyStep) => {
  const [values, setValues] = useState(['', '', '', '', '', '']);

  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement>>([]);
  const [signUp] = useMutation<MessageResponse, MutationSignUpArgs>(
    signUpMutation,
    {
      variables: { email },
    }
  );
  const [verify, { data }] = useMutation<VerifyResponse, MutationVerifyArgs>(
    signUpMutation,
    {
      onError(error) {
        const { message } = error;
        toast.error(message);
      },
      onCompleted({ accessToken }) {
        const now = new Date();
        now.setTime(now.getTime() + 1 * 3600 * 1000);
        setCookie('accessToken', accessToken, { expires: now });
        if (accessToken) {
          router.push(`/?tab=Shop`);
        }
      },
    }
  );

  useEffect(() => {
    if (values[values.length - 1]) {
      verify({ variables: { code: values.join(''), email } });
    }
  }, [values]);

  const handleChange = async (value: string, index: number) => {
    try {
      if (value.length === 1 && index < values.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
    } catch (error) {
      setValues(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
      <HStack alignItems="center" justifyContent="center">
        {values.map((value, index) => (
          <Input
            key={index}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
            textAlign="center"
            fontSize="2xl"
            width="3rem"
            height="3rem"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            focusBorderColor="blue.500"
          />
        ))}
      </HStack>
      <Text onClick={resendCode} cursor="pointer" align="center" mb="8px">
        Didn&apos;t work? Send me another code.
      </Text>
      <Button
        width="100%"
        colorScheme="orange"
        type="submit"
        onClick={async () =>
          await verify({ variables: { code: values.join(''), email } })
        }
      >
        VERIFY
      </Button>
    </>
  );
};

export default VerifyStep;
