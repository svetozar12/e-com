import { useRouter } from 'next/router';
import Home from '../components/Home/Home';
import { TabType } from '../components/Navbar/subcomponents/ShopTabs/ShopTabs';
import LaptopsTab from '../components/LaptopsTab/LaptopsTab';
import PCsTab from '../components/PCsTab/PCsTab';
import SmarthphonesTab from '../components/SmarthphonesTab/SmarthphonesTab';

function Index() {
  const router = useRouter();
  const tab = router.query.tab as TabType;
  console.log(tab);
  switch (tab) {
    case 'Shop':
      return <Home />;
    case 'Laptops':
      return <LaptopsTab />;
    case 'PCs':
      return <PCsTab />;
    case 'Smartphones':
      return <SmarthphonesTab />;
    default:
      return null;
  }
}

export default Index;
