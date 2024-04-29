import useSession from '../../../../hooks/useSession';
import { getEmailInitials } from '../../../../utils/getInitials';
import React from 'react';
import css from './Profile.module.css';
import { FaUser } from 'react-icons/fa';
import cx from 'classnames';

const Profile = () => {
  const { session } = useSession();

  if (!session) {
    return <FaUser className={css.container} />;
  }

  return (
    <div className={cx(css.container, css.initials)}>
      {session && getEmailInitials(session.email)}
    </div>
  );
};

export default Profile;
