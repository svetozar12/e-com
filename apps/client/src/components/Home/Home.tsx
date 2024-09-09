import React from 'react';
import Button from '../common/Button/Button';
import { useRouter } from 'next/router';
import styles from './Home.module.css';
import NewCollection from './subcomponents/NewCollection/NewCollection';

const Home = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <NewCollection />
    </div>
  );
};

export default Home;
