'use client';
import { sdk } from '@e-com/sdk';
import React, { useState } from 'react';
import css from './Login.module.css';
import Button from '../common/Button/Button';
import Input from '../common/Inputs/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  async function onSubmit() {
    console.log('hi', email);
    const res = await sdk.auth().verify({ code: 123, email });
  }
  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <form className={css.form}>
          <h1 className={css.header}>E-COMMERCE APP</h1>
          <div>
            <label htmlFor="email">EMAIL</label>
            <Input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            ></Input>
          </div>
          <Button type="submit" onClick={onSubmit}>
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
