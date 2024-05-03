import React from 'react';
import css from './Input.module.css';
import cx from 'classnames';

type IInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = ({ className, ...props }: IInput) => {
  return (
    <div className={cx(css.container, className)}>
      <input {...props} />
    </div>
  );
};

export default Input;
