import { NextPage, NextPageContext } from 'next';
import withAuthentication from '../../utils/auth';
import { redirect } from 'next/navigation';

function Profile() {
  return <>profile</>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  if (!(await withAuthentication.isAuth(ctx)))
    return {
      redirect: {
        destination: '/login', // The page to redirect to
        permanent: false, // Set to true if this is a permanent redirect (HTTP 301)
      },
    };
  return { props: {} };
  // ...
}

export default withAuthentication(Profile);
