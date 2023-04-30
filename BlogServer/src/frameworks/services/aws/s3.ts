import aws from "aws-sdk";
import getConfigs from "../../../configs";

const config = getConfigs();

aws.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretKeyId,
  region: config.aws.region,
  signatureVersion: config.aws.version,
});

const s3 = new aws.S3();

export const createPutObjectS3TempLink = async (key: string) => {
  const url = s3.getSignedUrl("putObject", {
    Bucket: config.aws.bucketName,
    Key: key,
    Expires: config.aws.s3SignedExpires,
  });
  return url;
};

export default {
  createPutObjectS3TempLink,
};
