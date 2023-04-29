import validatorImpl from "../../frameworks/validator";

const validatorInterface = (validator: ReturnType<typeof validatorImpl>) => {
  const isValidUrl = async (url: string) => validator.isValidUrl(url);
  const isValidTitle = async (title: string) => validator.isValidTitle(title);

  return {
    isValidUrl,
    isValidTitle,
  };
};

export default validatorInterface;
