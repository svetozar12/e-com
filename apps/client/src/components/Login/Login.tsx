'use client';
import React, { useState } from 'react';
import css from './Login.module.css';

import EmailStep from './subComponents/EmailStep/EmailStep';
import VerifyStep from './subComponents/VerifyStep/VerifyStep';

export type Step = 'email' | 'verify';

const Login = () => {
  const [step, setStep] = useState<Step>('email');
  function renderStep() {
    switch (step) {
      case 'email':
        return <EmailStep setStep={setStep} />;
      case 'verify':
        return <VerifyStep setStep={setStep} />;
      default:
        return <EmailStep setStep={setStep} />;
    }
  }
  return (
    <div className={css.container}>
      <div className={css.formContainer}>{renderStep()}</div>
    </div>
  );
};

export default Login;
