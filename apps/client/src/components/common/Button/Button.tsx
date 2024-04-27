import React from 'react';
import css from './Button.module.css';

type IButton = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = (props: IButton) => {
  return (
    <div className={css.container}>
      <button {...props} />
    </div>
  );
};

export default Button;
