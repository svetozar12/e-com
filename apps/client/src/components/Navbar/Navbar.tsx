import React from 'react';
import Logo from './subcomponents/Logo/Logo';
import styles from './Navbar.module.css';
import ShopTabs from './subcomponents/ShopTabs/ShopTabs';
import {
  Avatar,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import useSession from '../../hooks/useSession';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { session, logout } = useSession();
  if (pathname.includes('/login')) return null;
  return (
    <div className={styles.container}>
      <Logo />
      <ShopTabs />
      <div className={`${styles.rightSide}`}>
        {session ? (
          <Container
            cursor="pointer"
            centerContent
            display="flex"
            flexDir="row"
            gap={2}
          >
            <Menu>
              {/* MenuButton with Avatar as the trigger */}
              <MenuButton>
                <Avatar
                  shadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                  name={session.email}
                />
              </MenuButton>

              {/* The dropdown menu */}
              <MenuList>
                <MenuItem onClick={() => router.push('/profile')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Container>
        ) : (
          <Button
            onClick={() => router.push('/login')}
            colorScheme="blue"
            variant="outline"
          >
            Login
          </Button>
        )}

        <Container
          cursor="pointer"
          centerContent
          display="flex"
          flexDir="row"
          gap={2}
        >
          <FiShoppingCart size="40px" />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
