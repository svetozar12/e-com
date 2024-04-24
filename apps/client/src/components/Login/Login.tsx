'use client';
import { sdk } from '@e-com/sdk';
import React, { useState } from 'react';
import css from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  async function onSubmit() {
    console.log('hi', email);
    const res = await sdk.auth().verify({ code: 123, email });
  }
  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <input
          style={{ border: '1px black solid' }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type="submit" onClick={onSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Login;
