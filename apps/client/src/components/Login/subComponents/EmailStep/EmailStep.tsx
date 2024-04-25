import React, { useState } from 'react';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Inputs/Input';
import { sdk } from '@e-com/sdk';
import { Step } from '../../Login';

interface IEmailStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailStep = ({ setStep, email, setEmail }: IEmailStep) => {
  async function onSubmit() {
    const [res, err] = await sdk.auth().signUp({ email });
    const { data } = res || {};
    if (data) {
      setStep('verify');
    } else {
      setStep('email');
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
