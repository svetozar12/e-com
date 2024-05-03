'use client';
import { useEffect } from 'react';
import Login from '../../components/Login/Login';

export default function Index() {
  useEffect(() => {
    // Set a timeout to simulate a delay
    const timer = setTimeout(() => {
      console.log('Component will render now.');
    }, 10000); // Delays the rendering by 10 seconds

    // Clear the timeout if the component unmounts before the time is up
    return () => clearTimeout(timer);
  }, []);
  return <Login />;
}
