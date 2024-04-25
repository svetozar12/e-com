import React from 'react';
import css from './VerifyStep.module.css';
import { Step } from '../../Login';

interface IVerifyStep {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

const VerifyStep = ({ setStep }: IVerifyStep) => {
  return <div className={css.container}>VerifyStep</div>;
};

export default VerifyStep;
