import randomId from "random-id";

/**
 * This class provides common utility functions
 */
export default class GetUtils {
  /**
   * This methord is used to create error objects wich http status codes and status messages
   * @param code Http status code for error
   * @param error Error message
   * @param optionalData Additional data for more actions
   * @returns Objects with error details
   */
  createError(code: number = 500, error: string, optionalData?: object | null) {
    return {
      error: error ? error : "Oops thats an error",
      code: Number(code),
      ...optionalData,
    };
  }

  /**
   * To handle error in .Catch of a promise in simple way customizable error message and code
   * @param code https status code
   * @param errorMessage Error Message
   * @returns a fuction wich throws an expection with createError object with error message and code
   */
  throwCustomError(code: number, errorMessage?: string) {
    return (error: any) => {
      throw this.createError(code, errorMessage ?? error?.message ?? "Oops something went wrong", error);
    };
  }

  /**
   * To handle error in .Catch of a promise in simple way as internal server error
   * @param errorMessage Error message
   * @returns a fuction wich throws an expection with createError object with error message
   */
  throwInternalError(errorMessage?: string) {
    return (error: any) => {
      throw this.createError(500, errorMessage ?? error?.message ?? "Oops something went wrong", error);
    };
  }

  /**
   * This funtions handles and converts normal error to internal server error using throwInternalError.
   * First argumet is promise funcion and rest of arguments are passed to the promise function
   * @param promiseFunction Promise funtctios to be handled
   * @param args Argumients for the promise function
   * @returns Result of promise function
   */
  async handleInteralError(promiseFunction: any, ...args: any[]) {
    return await promiseFunction(...args).catch(this.throwInternalError());
  }

  /**
   * Creates a new random id string
   * @param options Options for creating random id
   * @returns promise with random id generated according to options
   */
  async generateRandomId(options?: { withLowerCase?: boolean; length?: number }) {
    const defaultPattern = "A0";
    const withLowerCasePattern = "Aa0";
    return await randomId(options?.length || 22, options?.withLowerCase ? withLowerCasePattern : defaultPattern);
  }

  /**
   * This function returs a random id when the promise funtion returns nothing or nullishing value. This is used in creation of unique ids.
   * @param options Options for creating random id
   * @param promiseFunctionWithResults Promise function to be called to return random id on non existance of response
   * @param argsOfPromiseFunction Arguments for the promise funtions function
   * @returns promise with random id generated according to options
   */
  async generateRandomIdWithExistingValidation(
    options: { withLowerCase?: boolean; length?: number },
    promiseFunctionWithResults: any,
    ...argsOfPromiseFunction: any[]
  ) {
    let id: string;
    do {
      id = await this.generateRandomId(options);
    } while (await promiseFunctionWithResults(...argsOfPromiseFunction));
    return id;
  }
}
