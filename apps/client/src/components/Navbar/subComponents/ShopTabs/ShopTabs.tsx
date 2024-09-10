import {
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs as ChakraTabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './ShopTabs.module.css';
import { useRouter } from 'next/router';

export const Tabs = {
  SHOP: 'Shop',
  PCS: 'PCs',
  LAPTOPS: 'Laptops',
  SMARTPHONES: 'Smartphones',
} as const;

export type TabType = (typeof Tabs)[keyof typeof Tabs];

const ShopTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const router = useRouter();
  function handleTabChange(index: number) {
    const tab = Object.keys(tabMapping)[index] as TabType;
    router.push(
      { pathname: `${router.pathname}`, query: { ...router.query, tab } },
      undefined,
      { shallow: true }
    );
    setActiveTabIndex(index);
  }

  const tabMapping: Record<TabType, number> = {
    [Tabs.SHOP]: 0,
    [Tabs.PCS]: 1,
    [Tabs.LAPTOPS]: 2,
    [Tabs.SMARTPHONES]: 3,
  };

  useEffect(() => {
    const queryTab = router.query.tab as TabType;
    if (queryTab && tabMapping[queryTab] !== undefined) {
      setActiveTabIndex(tabMapping[queryTab]);
    } else {
      setActiveTabIndex(0);
    }
  }, [router.query.tab]);

  return (
    <ChakraTabs
      index={activeTabIndex}
      onChange={handleTabChange}
      className={styles.container}
      align="center"
    >
      <TabList>
        <Tab>{Tabs.SHOP}</Tab>
        <Tab>{Tabs.PCS}</Tab>
        <Tab>{Tabs.LAPTOPS}</Tab>
        <Tab>{Tabs.SMARTPHONES}</Tab>
      </TabList>
    </ChakraTabs>
  );
};

export default ShopTabs;
