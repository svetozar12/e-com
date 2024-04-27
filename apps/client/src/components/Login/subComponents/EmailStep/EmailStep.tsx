import React from 'react';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Inputs/Input';
import { sdk } from '@e-com/sdk';
import { Step } from '../../Login';
import { toast } from 'react-toastify';

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
        <label htmlFor="email">EMAIL</label>
        <Input
          id="email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></Input>
      </div>
      <Button type="submit" onClick={onSubmit}>
        LOGIN
      </Button>
    </>
  );
};

export default EmailStep;
