import { Container, Link } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { FaInstagram } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

const SocialLinks = () => {
  const socialLinks: Array<{ Icon: IconType; href: string }> = [
    { href: '#', Icon: FaInstagram },
    { href: '#', Icon: BsTwitterX },
    { href: '#', Icon: FaWhatsapp },
  ];

  return (
    <Container gap={10} centerContent flexDir="row" justifyContent="center">
      {socialLinks.map(({ href, Icon }, index) => {
        return (
          <Link key={index + href} href={href}>
            <Icon size={30} />
          </Link>
        );
      })}
    </Container>
  );
};

export default SocialLinks;
