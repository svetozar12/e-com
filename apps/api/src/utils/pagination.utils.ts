import { Document, Model } from 'mongoose';

interface PaginationResults<T extends Document> {
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  data: T[];
}

const paginateResults = async <T extends Document>(
  model: Model<T>,
  query: any,
  page: number,
  limit: number,
  sortBy?: string
): Promise<PaginationResults<T>> => {
  const skip = (page - 1) * limit;
  const results: PaginationResults<T> = {
    next: { limit: 0, page: 0 },
    previous: { limit: 0, page: 0 },
    data: [],
  };

  // Initialize the query and apply sort if `sortBy` is defined
  const findQuery = model.find({
    ...query,
  });

  // Apply sort condition only if `sortBy` is defined
  if (sortBy) {
    findQuery.sort({ [sortBy]: 'asc' });
  }

  // Paginate
  const productList = await findQuery.skip(skip).limit(limit);

  const count = await model.countDocuments(query).exec();

  if (skip + limit < count) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (skip > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.data = productList;
  return results;
};

export { PaginationResults, paginateResults };
