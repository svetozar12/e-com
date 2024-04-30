import useSession from '../../../../hooks/useSession';
import { getEmailInitials } from '../../../../utils/getInitials';
import React from 'react';
import css from './Profile.module.css';
import { FaUser } from 'react-icons/fa';
import cx from 'classnames';
import Dropdown from '../../../common/Dropdown/Dropdown';
import { FaHouseUser } from 'react-icons/fa';
import Button from '../../../common/Button/Button';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const { session } = useSession();
  const router = useRouter();
  if (!session) {
    return (
      <Dropdown
        label={
          <div className={css.container}>
            <FaUser className={css.container} />
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
          <FaHouseUser className="icon" />
          Login into your account
        </div>
        <Button onClick={() => router.push('/login')}>Login</Button>
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
      <p>Hello {session.email}</p>
    </Dropdown>
  );
};

export default Profile;
