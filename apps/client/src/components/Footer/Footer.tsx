import React from 'react';
import Logo from '../Navbar/subcomponents/Logo/Logo';
import Links from './subcomponents/Links/Links';
import { Container, Divider } from '@chakra-ui/react';
import SocialLinks from './subcomponents/SocialLinks/SocialLinks';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes('/login')) return null;
  return (
    <Container
      centerContent
      justifyContent="space-between"
      flexDir="column"
      height="200px"
      marginBottom={20}
    >
      <Logo />
      <Links />
      <Divider />
      <SocialLinks />
    </Container>
  );
};

export default Footer;
