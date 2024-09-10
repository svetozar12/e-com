import { Container, Link } from '@chakra-ui/react';
import React from 'react';

const Links = () => {
  const links: Array<{ title: string; href: string }> = [
    { href: '#', title: 'Company' },
    { href: '#', title: 'Products' },
    { href: '#', title: 'Offices' },
    { href: '#', title: 'About' },
    { href: '#', title: 'Contact' },
  ];

  return (
    <Container justifyContent="space-between" centerContent flexDir="row">
      {links.map(({ href, title }) => {
        return (
          <Link key={title + href} href={href}>
            {title}
          </Link>
        );
      })}
    </Container>
  );
};

export default Links;
