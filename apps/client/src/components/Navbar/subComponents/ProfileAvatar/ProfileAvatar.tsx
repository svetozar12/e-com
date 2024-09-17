import {
  Container,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import useSession from '../../../../hooks/useSession';

const ProfileAvatar = () => {
  const { session, logout } = useSession();

  if (!session)
    return (
      <Button
        onClick={() => router.push('/login')}
        colorScheme="blue"
        variant="outline"
      >
        Login
      </Button>
    );

  return (
    <Container
      cursor="pointer"
      centerContent
      display="flex"
      flexDir="row"
      gap={2}
    >
      <Menu>
        <MenuButton className="hover-effect">
          <Avatar
            shadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            name={session.email}
          />
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
};

export default ProfileAvatar;
