import useSession from '../../../../hooks/useSession';
import { getEmailInitials } from '../../../../utils/getInitials';
import React, { useTransition } from 'react';
import css from './Profile.module.css';
import { FaUser } from 'react-icons/fa';
import cx from 'classnames';
import Dropdown from '../../../common/Dropdown/Dropdown';
import { FaHouseUser } from 'react-icons/fa';
import Button from '../../../common/Button/Button';
import { useRouter } from 'next/navigation';
import { RiArrowDropDownFill } from 'react-icons/ri';

const Profile = () => {
  const { session } = useSession();
  const router = useRouter();
  const [, startTransition] = useTransition();
  if (!session) {
    return (
      <Dropdown
        label={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
            }}
          >
            <FaUser className={cx(css.container, 'icon-small')} />
            <span>Profile</span>
            <RiArrowDropDownFill className="icon-small" />
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <FaHouseUser className="icon-large" />
          <span className="text-small">Login into your account</span>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            startTransition(() => {
              router.push('/login');
            });
          }}
        >
          Login
        </Button>
      </Dropdown>
    );
  }

  return (
    <Dropdown
      label={
        <div className={cx(css.container, css.initials)}>
          {session && getEmailInitials(session.email)}
        </div>
      }
    >
      <span>Hello {session.email}</span>
    </Dropdown>
  );
};

export default Profile;
