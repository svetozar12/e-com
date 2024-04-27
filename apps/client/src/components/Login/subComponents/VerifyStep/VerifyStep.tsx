import React, { useState } from 'react';
import { Step } from '../../Login';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Inputs/Input';
import { sdk } from '@e-com/sdk';

interface IVerifyStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyStep = ({ setStep, setIsLoading, email }: IVerifyStep) => {
  const [code, setCode] = useState('');
  async function onSubmit() {
    setIsLoading(true);
    const [res, err] = await sdk.auth().verify({ code: code, email });
    setIsLoading(false);
    const {
      data: { accessToken },
    } = res || {};
  }
  return (
    <>
      <div>
        <label htmlFor="code">VERIFICATION CODE</label>
        <Input
          id="code"
          required
          type="code"
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
        ></Input>
      </div>
      <Button type="submit" onClick={onSubmit}>
        VERIFY
      </Button>
    </>
  );
};

export default VerifyStep;
