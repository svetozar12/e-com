'use client';
import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import css from './MenuNavbar.module.css';
import { sdk } from '@e-com/sdk';

type MenuItem = Required<MenuProps>['items'][number];

const MenuNavbar = () => {
  const router = useRouter();
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function fetchData() {
    const [res, err, isLoading] = await sdk.category().getCategoryList();
    if (err) {
      setIsLoading(false);
      console.log(err);
    }
    if (res) {
      setData(res);
      setIsLoading(false);
    }
  }
  console.log(data);
  const menuData = data.map(({ _id, name, subcategories }, index) => {
    const children = (subcategories as Array<any>).map((data) => {
      return { key: data._id, label: data.name };
    });
    return { key: _id, label: name, type: 'group', children };
  });
  const items: MenuItem[] = [
    {
      key: 'categories',
      icon: <MailOutlined />,
      label: 'Categories',
      children: menuData,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <div className={css.container}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default MenuNavbar;
