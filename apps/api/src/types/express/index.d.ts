import { IUser } from '../../models/User.model';
import { PaginatedResults } from '../../middleware/paginate.middleware';
// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      csrfToken?: () => string;
    }
    export interface Response {
      paginatedResults?: PaginatedResults;
    }
  }
}
