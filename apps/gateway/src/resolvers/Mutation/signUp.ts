import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from './../../codegen/types.generated';
export const signUp: NonNullable<MutationResolvers['signUp']> = async (
  _parent,
  { email }
) =>
  sdk
    .auth()
    .signUp({ email })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(formatError);
