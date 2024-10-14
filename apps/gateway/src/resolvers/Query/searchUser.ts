import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { QueryResolvers } from './../../codegen/types.generated';
export const searchUser: NonNullable<QueryResolvers['searchUser']> = async (
  _parent,
  { searchText },
  { token }
) => sdk.search().searchUsers(searchText, token).catch(formatError);
