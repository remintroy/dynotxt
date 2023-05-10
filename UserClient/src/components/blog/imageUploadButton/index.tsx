import { Button, Loader } from "@mantine/core";
import { IconCheck, IconRotateClockwise2, IconStatusChange, IconUpload } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications"; 
import axios from "axios";
import { useGetImageUploadUrlMutation, usePutBlogImageUrlMutation } from "../../../lib/api/blogApi";

const ImageUploadButtonComponent = ({
  value,
  setValue,
  blogId,
}: {
  value: string;
  setValue: any;
  blogId: string | undefined;
}) => {
  const [getImageUrl] = useGetImageUploadUrlMutation();
  const [putImageUrl] = usePutBlogImageUrlMutation();

  const inputref: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleChooseClick = () => {
    setFile(null);
    if (inputref.current && !loading) {
      inputref.current.value = null;
      inputref.current.click();
    }
  };

  useEffect(() => {
    if (file) {
      setLoading(false);
      setError(false);
      setUploaded(false);
      const uploadImage = async () => {
        try {
          const { url } = await getImageUrl(blogId).unwrap();
          await axios.put(url, file); //! Change to RTK query
          await putImageUrl({ blogId, bannerImgURL: url?.split("?")?.[0] });
          setValue(url?.split("?")[0]);
          setLoading(false);
          setUploaded(true);
          notifications.show({
            color: "green",
            title: "Uploaded",
            message: "Banner image is changed to new one",
          });
        } catch (error: any) {
          notifications.show({
            color: "red",
            title: "Error uploading image !",
            message: error?.response?.data?.error
              ? error.response.data.error
              : "Consider refreshing the page. If issue presist please contact support team",
          });
          setLoading(false);
          setError(true);
        }
      };

      if (file?.type?.split("/")[0] === "image") {
        setLoading(true);
        uploadImage();
      } else {
        notifications.show({
          title: "Invalid image file",
          message: "Consider checking the file you selected and make sure it is a valid image file",
          color: "red",
        });
      }
    }
  }, [file]);

  return (
    <Button
      variant="outline"
      leftIcon={
        error ? (
          <IconRotateClockwise2 size="20px" />
        ) : uploaded ? (
          <IconCheck size={"20px"} />
        ) : loading ? (
          <Loader size={"xs"} />
        ) : value ? (
          <IconStatusChange />
        ) : (
          <IconUpload size={"20px"} />
        )
      }
      onClick={handleChooseClick}
    >
      {error
        ? "Retry Upload"
        : uploaded
        ? "Banner Uploaded. Click to re-select"
        : loading
        ? "Uploading..."
        : value
        ? "Change banner image"
        : "Choose banner image"}
      <input
        type="file"
        ref={inputref}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
        accept="image/*"
        hidden
      />
    </Button>
  );
};

export default ImageUploadButtonComponent;
