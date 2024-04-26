'use client';
import React, { useState } from 'react';
import css from './Login.module.css';

import EmailStep from './subComponents/EmailStep/EmailStep';
import VerifyStep from './subComponents/VerifyStep/VerifyStep';
import Spinner from '../common/Spinner/Spinner';

export type Step = 'email' | 'verify';

const Login = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

  function renderStep() {
    switch (step) {
      case 'email':
        return (
          <EmailStep email={email} setEmail={setEmail} setStep={setStep} />
        );
      case 'verify':
        return <VerifyStep email={email} setStep={setStep} />;
      default:
        return (
          <EmailStep email={email} setEmail={setEmail} setStep={setStep} />
        );
    }
  }
  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <form className={css.form} onSubmit={(e) => e.preventDefault()}>
          <h1 className={css.header}>E-COMMERCE APP</h1>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default Login;
