import React, { useTransition } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import css from './Cart.module.css';
import Dropdown from '../../../common/Dropdown/Dropdown';
import cx from 'classnames';
import { RiArrowDropDownFill } from 'react-icons/ri';
import Button from '../../../common/Button/Button';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  return (
    <Dropdown
      label={
        <div className={css.cartContainer}>
          <FaCartShopping className={cx(css.container, 'icon-small')} />
          <span>Cart</span>
          <RiArrowDropDownFill className="icon-small" />
        </div>
      }
    >
      <span className="text-small" style={{ textAlign: 'center' }}>
        You don&apos;t have any any products in your cart
      </span>
      <Button
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => {
            router.push('/cart');
          });
        }}
      >
        View Cart
      </Button>
    </Dropdown>
  );
};

export default Cart;
