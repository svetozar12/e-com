import { ComponentType } from 'react';
import useSession from '../hooks/useSession';
import { NextPageContext } from 'next';
import cookie from 'cookie';
import { ACCESS_TOKEN } from '../constants/cookies';
import { client } from '../pages/_app';
import { verifyTokenQuery } from '../graphql/queries/queries/auth/verifyToken';
const withAuthentication = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const { session } = useSession();
    if (session) return <WrappedComponent {...props} />;
    return <p>Unauthorized</p>;
  };

  return ComponentWithAuth;
};

withAuthentication.isAuth = async (ctx: NextPageContext): Promise<boolean> => {
  const cookies = ctx.req?.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies[ACCESS_TOKEN] || '';
  try {
    const { error } = await client.query({
      query: verifyTokenQuery,
      variables: { token },
    });
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export default withAuthentication;
