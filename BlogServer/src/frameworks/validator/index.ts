// import validator from "validator";
// eslint-disable-next-line import/no-extraneous-dependencies
import z from "zod";

const validatorImpl = () => {
  const isValidUrl = async (url: string) => {
    try {
      const result = z
        .string({ required_error: "Url is required" })
        .url()
        .optional()
        .parse(url);
      return result;
    } catch (error) {
      //
    }
  };
  const isValidTitle = async (title: string) => {
    const result = z
      .string({
        invalid_type_error: "Title must be a stirng",
        required_error: "Title is requried",
      })
      .optional()
      .parse(title);
    return result;
  };
  //   const isValidBody = async ()
  return {
    isValidUrl,
    isValidTitle,
  };
};

export default validatorImpl;
