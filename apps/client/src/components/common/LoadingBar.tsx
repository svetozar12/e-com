'use client';
import React, { useEffect, useState, useTransition } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from 'next/navigation'; // Updated imports

const LoadingBarClient = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isPending] = useTransition();

  useEffect(() => {
    if (!isPending) {
      setProgress(100);
      setTimeout(() => setProgress(0), 800);
    } else {
      setProgress(40);
    }
  }, [isPending]);
  return <LoadingBar color="var(--button-primary)" progress={progress} />;
};

export default LoadingBarClient;
