import { AxiosError } from 'axios';
import { sdk } from '../../../utils/sdk';
import FormData from 'form-data';
import { GraphQLError } from 'graphql';

export const productsResolver = {
  Query: {
    products: (_, { args: { pagination } }) =>
      sdk.product().getProducts(pagination),
    productById: (_, { id }) => sdk.product().getProductById(id),
  },
  Mutation: {
    createProduct: async (_, { file, product }: { file; product: any }) => {
      const formData = new FormData();
      const fileBuffer = Buffer.concat(file.blobParts);

      formData.append('file', fileBuffer, {
        filename: file.name,
        contentType: file.type,
      });

      Object.keys(product).forEach(function (key) {
        formData.append(key, product[key]);
      });

      return sdk
        .product()
        .createProduct(formData)
        .catch((err: unknown) => {
          if (err instanceof AxiosError) {
            console.log(err.response.data);
            return Promise.reject(new GraphQLError(err.response.data.message));
          }
          return Promise.reject(err);
        });
    },
    updateProduct: (_, { id, product }) =>
      sdk.product().updateProduct(id, product),
    deleteProduct: (_, { id }) => sdk.product().deleteProduct(id),
  },
};
