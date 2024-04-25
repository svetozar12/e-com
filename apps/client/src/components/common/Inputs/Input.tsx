import React from 'react';
import css from './Input.module.css';
type IInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: IInput) => {
  return (
    <div className={css.container}>
      <input {...props} />
    </div>
  );
};

export default Input;
