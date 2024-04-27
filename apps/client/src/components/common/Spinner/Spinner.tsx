import React from 'react';
import css from './Spinner.module.css';

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
        <div className={css.spinner}></div>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Spinner;
