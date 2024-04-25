import React, { useState } from 'react';
import { Step } from '../../Login';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Inputs/Input';
import { sdk } from '@e-com/sdk';

interface IVerifyStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

const VerifyStep = ({ setStep, email }: IVerifyStep) => {
  const [code, setCode] = useState('');
  async function onSubmit() {
    const [res, err] = await sdk.auth().verify({ code: code, email });

    const { data } = res || {};
    console.log(data.accessToken);
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
