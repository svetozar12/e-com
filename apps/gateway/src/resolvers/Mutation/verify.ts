import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from './../../codegen/types.generated';
export const verify: NonNullable<MutationResolvers['verify']> = async (
  _parent,
  args
) => sdk.auth().verify(args).catch(formatError);
