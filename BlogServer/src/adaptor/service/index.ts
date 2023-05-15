import blogServiceImpl from "../../frameworks/services";

const blogServiceInterface = (service: ReturnType<typeof blogServiceImpl>) => {
  const createId = () => service.createId();
  const createBannerUploadUrl = (key: string) => service.createBannerUploadUrl(key);

  return {
    createId,
    createBannerUploadUrl,
  };
};

type blogServiceInterface = ReturnType<typeof blogServiceInterface>;
export default blogServiceInterface;
