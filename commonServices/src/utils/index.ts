import createErrorFile from "./createError";

export const getUtils = () => {
  return {
    createError: createErrorFile,
  };
};

export default getUtils;
