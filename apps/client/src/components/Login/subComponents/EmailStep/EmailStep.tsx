import React, { useState } from 'react';
import css from './EmailStep.module.css';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Inputs/Input';
import { sdk } from '@e-com/sdk';
import { Step } from '../../Login';

interface IEmailStep {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

const EmailStep = ({ setStep }: IEmailStep) => {
  const [email, setEmail] = useState('');
  async function onSubmit() {
    console.log('hi', email);
    const res = await sdk.auth().verify({ code: 123, email });
  }
  return (
    <form className={css.form}>
      <h1 className={css.header}>E-COMMERCE APP</h1>
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
    </form>
  );
};

export default EmailStep;
