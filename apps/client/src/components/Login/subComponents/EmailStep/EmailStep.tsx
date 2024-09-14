import React from 'react';
import { sdk } from '@e-com/sdk';
import { Step } from '../../Login';
import { toast } from 'react-toastify';
import { Button, Input, Text } from '@chakra-ui/react';

interface IEmailStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailStep = ({ setStep, email, setEmail, setIsLoading }: IEmailStep) => {
  async function onSubmit() {
    setIsLoading(true);
    const [res, err] = await sdk.auth().signUp({ email });
    setIsLoading(false);
    if (err) {
      const { message } = err;
      toast.error(message);
      setStep('email');
    }
    const { data } = res || {};
    if (data) {
      console.log(data);
      toast.success(data.message);
      setStep('verify');
    }
  }
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
        onClick={onSubmit}
      >
        LOGIN
      </Button>
    </>
  );
};

export default EmailStep;
