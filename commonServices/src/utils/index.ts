import createErrorFile from "./createError";

export default class utilService {
  createError = (code: number, error: string, optionalData?: object | null) => createErrorFile(code, error, optionalData);
}
