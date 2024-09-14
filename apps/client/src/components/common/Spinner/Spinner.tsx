import React from 'react';
import css from './Spinner.module.css';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';
interface ISpinner {
  children: React.ReactNode;
  loading: boolean;
}

const Spinner = (
  { children, loading }: ISpinner = { children: <></>, loading: false }
) => {
  if (!loading) return children;
  return (
    <div className={css.container}>
      <div className={css.overlay}>
        <ChakraSpinner size="xl" />
      </div>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Spinner;
