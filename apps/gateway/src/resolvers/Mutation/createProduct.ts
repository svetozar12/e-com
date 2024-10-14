import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from './../../codegen/types.generated';
import FormData from 'form-data';
export const createProduct: NonNullable<
  MutationResolvers['createProduct']
> = async (_parent, { file, product }, { token }) => {
  const formData = new FormData();
  const fileBuffer = Buffer.concat(file.blobParts);

  formData.append('file', fileBuffer, {
    filename: file.name,
    contentType: file.type,
  });

  Object.keys(product).forEach(function (key) {
    formData.append(key, product[key]);
  });

  return sdk.product().createProduct(formData, token).catch(formatError);
};
