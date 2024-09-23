import { formatError } from '../../utils/error';
import { sdk, setSdkToken } from '../../utils/sdk';
import type { QueryResolvers } from './../../codegen/types.generated';
export const verifyToken: NonNullable<QueryResolvers['verifyToken']> = async (
  _parent,
  { token }
) =>
  sdk
    .auth()
    .verifyToken(token)
    .then((data) => {
      setSdkToken(token);
      return data;
    })
    .catch(formatError);
