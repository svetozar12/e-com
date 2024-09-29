import { gql } from '@apollo/client';

export const productsQuery = gql`
  query products(
    $pagination: PaginationArgs = { page: 1, limit: 10, sortBy: "name" }
  ) {
    products(pagination: $pagination) {
      data {
        _id
        category
        createdAt
        description
        image
        name
        price
        quantity
        updatedAt
      }
      next {
        limit
        page
      }
      previous {
        limit
        page
      }
    }
  }
`;
