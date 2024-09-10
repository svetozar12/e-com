import React from 'react';
import styles from './Home.module.css';
import NewCollection from './subcomponents/NewCollection/NewCollection';
import PopularInPCs from './subcomponents/PopularInPCs/PopularInPCs';
import NewTech from './subcomponents/NewTech/NewTech';
import ExclusiveTech from './subcomponents/ExclusiveTech/ExclusiveTech';
import SubscribeToOffers from './subcomponents/SubscribeToOffers/SubscribeToOffers';

const Home = () => {
  return (
    <div className={styles.container}>
      <NewCollection />
      <PopularInPCs />
      <ExclusiveTech />
      <NewTech />
      <SubscribeToOffers />
    </div>
  );
};

export default Home;
