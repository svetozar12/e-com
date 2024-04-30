import React from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import css from './Cart.module.css';
import Dropdown from '../../../common/Dropdown/Dropdown';
import cx from 'classnames';

const Cart = () => {
  return (
    <Dropdown label={<FaCartShopping className={cx(css.container, 'icon')} />}>
      hello
    </Dropdown>
  );
};

export default Cart;
