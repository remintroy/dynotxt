import randomId from "random-id";
import getConfigs from "../../configs";
// import { createPutObjectS3TempLink } from "./aws/s3";

const blogServiceImpl = () => {
  const config = getConfigs();

  const createId = async (): Promise<string> => {
    const id = await randomId(config.blog.blogIdLength, "A0");
    return id;
  };

  const createBannerUploadUrl = async (key: string) => "";
  // createPutObjectS3TempLink(key);

  return {
    createId,
    createBannerUploadUrl,
  };
};

export default blogServiceImpl;
