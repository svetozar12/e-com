type AsyncFn<T, U extends any[]> = (...args: U) => Promise<T>;
type IResponse<T> = [T, null, boolean] | [null, any, boolean];

export function asyncHandler<T, U extends any[]>(
  fn: AsyncFn<T, U>
): (...args: U) => Promise<IResponse<T>> {
  return async (...args: U): Promise<IResponse<T>> => {
    let isloading = true;
    try {
      const result = await fn(...args);
      isloading = false;
      return [result, null, isloading];
    } catch (error: any) {
      isloading = false;
      return [null, error, isloading];
    }
  };
}
