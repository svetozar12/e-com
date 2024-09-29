'use client';
import React, { useEffect, useState } from 'react';
import css from './Login.module.css';

import EmailStep from './subComponents/EmailStep/EmailStep';
import VerifyStep from './subComponents/VerifyStep/VerifyStep';
import Spinner from '../common/Spinner/Spinner';
import Logo from '../Navbar/subcomponents/Logo/Logo';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export type Step = 'email' | 'verify';

const Login = () => {
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [step, setStep] = useState<Step>('email');

  useEffect(() => {
    setStep(router.query.step as Step);
    setIsLoading(false);
  }, [router.query.step]);

  const [email, setEmail] = useState<string>('');
  if (loading) return null;
  function renderStep() {
    switch (step) {
      case 'email':
        return (
          <EmailStep
            email={email}
            setEmail={setEmail}
            setStep={setStep}
            setIsLoading={setIsLoading}
          />
        );
      case 'verify':
        return <VerifyStep email={email} setIsLoading={setIsLoading} />;
      default:
        return (
          <EmailStep
            email={email}
            setEmail={setEmail}
            setStep={setStep}
            setIsLoading={setIsLoading}
          />
        );
    }
  }
  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <Logo />
        <Spinner loading={loading}>
          <form className={css.form} onSubmit={(e) => e.preventDefault()}>
            <Heading className={css.header}>Hello</Heading>
            {renderStep()}
          </form>
        </Spinner>
      </div>
    </div>
  );
};

export default Login;
