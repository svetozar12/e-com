import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from './../../codegen/types.generated';
export const deleteProduct: NonNullable<
  MutationResolvers['deleteProduct']
> = async (_parent, { id }, { token }) =>
  sdk.product().deleteProduct(id, token).catch(formatError);
