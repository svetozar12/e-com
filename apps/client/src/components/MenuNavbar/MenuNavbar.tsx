'use client';
import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname } from 'next/navigation';
import css from './MenuNavbar.module.css';

const MenuNavbar = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'categories',
      icon: <MailOutlined />,
      label: 'Categories',
      children: [
        {
          key: '1-1',
          label: 'Item 1',
          type: 'group',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ],
        },
        {
          key: '1-2',
          label: 'Item 2',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <div className={css.container}>
      <Menu
        openKeys={['categories']}
        onClick={onClick}
        style={{ width: 256 }}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default MenuNavbar;
