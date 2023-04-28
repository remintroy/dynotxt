import { Button } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";

const ImageUploadButton = ({ value, setValue }: { value: string; setValue: any }) => {
  return (
    <Button variant="outline" leftIcon={<IconCamera />}>
      Choose Cover photo
      <input type="file" name="" id="" />
    </Button>
  );
};

export default ImageUploadButton;
