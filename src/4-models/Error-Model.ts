export type ErrorType = {
    message: string;
    status: number;
  }
  
  export const ResourceNotFoundError = (id: number) => {
    const errorObj: ErrorType = { message: `id ${id} is not exist`, status: 404 }
    throw errorObj;
  }
  
  export const RouteNotFoundError = (route: string) => {
    const errorObj: ErrorType = { message: `Route ${route} is not exist`, status: 404 }
    throw errorObj;
  }
  
  export const NotModifiedError = (id: string) => {
    const errorObj: ErrorType = { message: `Car with id: ${id} not updated`, status: 304 }
    throw errorObj;
  }

  export const UnauthorizedError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 401 }
    throw errorObj;
  }
  
  export const ValidationError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 400 }
    throw errorObj;
  }
  
  export const UserExistError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 403 }
    throw errorObj;
  }
  
  
