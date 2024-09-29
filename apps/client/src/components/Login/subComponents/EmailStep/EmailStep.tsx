import React from 'react';
import { Step } from '../../Login';
import { toast } from 'react-toastify';
import { Button, Input, Text } from '@chakra-ui/react';
import { useSignUpMutation } from '../../../../graphql/generated';
import { useRouter } from 'next/router';

interface IEmailStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailStep = ({ setStep, email, setEmail, setIsLoading }: IEmailStep) => {
  const router = useRouter();
  const [signUp] = useSignUpMutation({
    variables: { email },
    onCompleted({ signUp: { message } }) {
      toast.success(message);
      setStep('verify');
      router.push(
        router.pathname,
        { query: { step: 'verify' } },
        { shallow: true }
      );
    },
    onError(error) {
      const { message } = error;
      return toast.error(message);
    },
  });

  return (
    <>
      <div>
        <Text align="center" mb="8px" fontWeight="bold">
          Please enter your email
        </Text>

        <Input
          id="email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></Input>
      </div>
      <Button
        width="100%"
        colorScheme="orange"
        type="submit"
        onClick={() => signUp()}
      >
        LOGIN
      </Button>
    </>
  );
};

export default EmailStep;
