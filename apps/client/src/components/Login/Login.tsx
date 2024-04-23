'use client';
import { sdk } from '@e-com/sdk';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  async function onSubmit() {
    console.log('hi', email);
    const res = await sdk.auth().verify({ code: 123, email });
    console.log(res);
  }
  return (
    <div>
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
  );
};

export default Login;
