import React, { useEffect, useRef, useState } from 'react';
import { Step } from '../../Login';
import { sdk } from '@e-com/sdk';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Input, Button, Text, HStack } from '@chakra-ui/react';

interface IVerifyStep {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyStep = ({ setStep, setIsLoading, email }: IVerifyStep) => {
  const [values, setValues] = useState(['', '', '', '', '', '']);

  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement>>([]);

  useEffect(() => {
    if (values[values.length - 1]) {
      onSubmit();
    }
  }, [values]);

  const handleChange = async (value: string, index: number) => {
    try {
      if (value.length === 1 && index < values.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      const newValues = [...values];
      newValues[index] = value;
      console.log(newValues.length, index);
      setValues(newValues);
    } catch (error) {
      setValues(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  async function onSubmit() {
    console.log(values.join(''));
    setIsLoading(true);
    const [res, err] = await sdk
      .auth()
      .verify({ code: values.join(', '), email });
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
      <Text align="center" mb="8px" fontWeight="bold">
        Please enter your verification code
      </Text>
      <HStack alignItems="center" justifyContent="center">
        {values.map((value, index) => (
          <Input
            key={index}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
            textAlign="center"
            fontSize="2xl"
            width="3rem"
            height="3rem"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            focusBorderColor="blue.500"
          />
        ))}
      </HStack>
      <Button
        width="100%"
        colorScheme="orange"
        type="submit"
        onClick={onSubmit}
      >
        VERIFY
      </Button>
    </>
  );
};

export default VerifyStep;
