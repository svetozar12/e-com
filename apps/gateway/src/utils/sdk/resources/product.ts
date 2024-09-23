import { Product } from '../../../codegen/types.generated';
import { instance } from '../sdk';
import FormData from 'form-data';

// Fetch products with pagination, category filter, and sorting
async function getProducts(
  query: { limit: number; page: number; sortBy?: string } = {
    limit: 10,
    page: 1,
  },
  category?: string
) {
  return (await instance.get('/products', { params: { ...query, category } }))
    .data;
}

// Fetch a product by ID
async function getProductById(params: { id: string; category?: string }) {
  const { id } = params;
  return (await instance.get(`/products/${id}`, { params })).data;
}

// Create a new product
async function createProduct(body: FormData) {
  return (
    await instance.post('/products', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data.product;
}

// Update an existing product by ID
async function updateProduct(id: string, body: Partial<Product>) {
  return (await instance.put(`/products/${id}`, body)).data;
}

// Delete a product by ID
async function deleteProduct(id: string) {
  return (await instance.delete(`/products/${id}`)).data;
}

// Export all product-related SDK methods
export const product = () => ({
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
});
