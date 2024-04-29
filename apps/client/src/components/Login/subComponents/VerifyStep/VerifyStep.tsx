import React, { useState } from 'react';
import { Step } from '../../Login';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Inputs/Input';
import { sdk } from '@e-com/sdk';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface IVerifyStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyStep = ({ setStep, setIsLoading, email }: IVerifyStep) => {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  async function onSubmit() {
    setIsLoading(true);
    const [res, err] = await sdk.auth().verify({ code: code, email });
    setIsLoading(false);
    if (err) {
      const { message } = err;
      toast.error(message);
      setStep('email');
    }
    const {
      data: { accessToken },
    } = res || {};
    const now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    setCookie('accessToken', accessToken, { expires: now });
    if (accessToken) {
      router.push('/');
    }
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
