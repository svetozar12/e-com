type AsyncFn<T, U extends any[]> = (...args: U) => Promise<T>;
type IResponse<T> = [T, null] | [null, any];

export function asyncHandler<T, U extends any[]>(
  fn: AsyncFn<T, U>
): (...args: U) => Promise<IResponse<T>> {
  return async (...args: U): Promise<IResponse<T>> => {
    try {
      const result = await fn(...args);
      return [result, null];
    } catch (error: any) {
      return [null, error];
    }
  };
}
