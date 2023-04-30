import { Button, Loader } from "@mantine/core";
import { IconCheck, IconRotateClockwise2, IconStatusChange, IconUpload } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { blogBackend } from "../../configs/axios";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";

const ImageUploadButton = ({ value, setValue, blogId }: { value: string; setValue: any; blogId: string | undefined }) => {
  const accessToken = useAppSelector((state) => state.user.accessToken);

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
          const {
            data: { url },
          } = await blogBackend.get(`/upload/${blogId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          await axios.put(url, file);

          await blogBackend.put(`/blog/${blogId}`, { bannerImgURL: url?.split("?")[0] }, { headers: { Authorization: `Bearer ${accessToken}` }, });

          setValue(url?.split("?")[0]);

          setLoading(false);
          setUploaded(true);
        } catch (error: any) {
          notifications.show({
            color: "red",
            title: "Error uploading image !",
            message: error?.response?.data?.error ? error.response.data.error : "Consider refreshing the page. If issue presist please contact support team"
          })
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
        ) : value ? <IconStatusChange /> : (
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
            : value ? "Change banner image" : "Choose banner image"}
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

export default ImageUploadButton;
