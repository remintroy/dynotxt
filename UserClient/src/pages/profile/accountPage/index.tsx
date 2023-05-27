import { useEffect, useRef, useState } from "react";
import {
  useGetFullUserDataQuery,
  usePutUserDataMutation,
  usePutUserPersionalDataMutation,
} from "../../../lib/api/authApi";
import { Avatar, Box, Button, Container, Divider, Flex, Grid, Input, Loader, Select, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; 
import { nprogress, NavigationProgress } from "@mantine/nprogress";
import { storageConfig } from "../../../lib/firebase";

const AccountProfilePage = () => {
  const { data: user, isLoading, isFetching } = useGetFullUserDataQuery({});
  const openRef = useRef<() => void>(null);

  const [updatePublicApi] = usePutUserDataMutation();
  const [updatePrivateApi] = usePutUserPersionalDataMutation();

  const [publicLoading, setPublicLoading] = useState(true);
  const [privateLoading, setPrivateLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<string | null>("");
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user?.name ?? "");
      setPhone(user?.phone ?? "");
      setGender(user?.gender ?? "");
      setImg(user?.photoURL ?? "");
      setPublicLoading(false);
      setPrivateLoading(false);
    }
  }, [user]);

  const handlePublicDetalsSubmit = async () => {
    try {
      setPublicLoading(true);
      await updatePublicApi({
        name,
      });
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: "Something went wrong",
        message: error?.data?.message ? error?.data?.message : "There was an error updating your data.",
      });
      console.log(error);
    }
    setPublicLoading(false);
  };

  const HandlePersionalDetalsSubmit = async () => {
    try {
      setPrivateLoading(true);
      await updatePrivateApi({
        phone,
        gender,
      });
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: "Something went wrong",
        message: error?.data?.message ? error?.data?.message : "There was an error updating your data.",
      });
      console.log(error);
    }
    setPrivateLoading(false);
  };

  const handleImageDrop = (files: File[]) => {
    const url = URL.createObjectURL(files?.[0]);
    if (files?.[0]?.type?.split("/")[0] === "image") {
      setImgFile(files?.[0]);
      setImg(url);
    } else {
      notifications.show({
        title: "Invalid image file",
        message: "Consider checking the file you selected and make sure it is a valid image file",
        color: "red",
      });
    }
  };

  const handleImageUpload = async () => {
    try {
      if (imgFile) {
        setImgLoading(true);
        const storageRef = ref(
          storageConfig,
          `users/${user?.uid}/pp.${imgFile.name.split(".")[imgFile.name.split(".").length - 1]}`
        );
        const uploadTask = uploadBytesResumable(storageRef, imgFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress === 100) nprogress.complete();
            else nprogress.set(progress);
          },
          (error) => {
            // storage error
            setImgLoading(false);
            console.error(error);
            notifications.show({
              color: "red",
              title: "Something went wrong",
              message: error?.message ? error?.message : "There was an error updating your data.",
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              // after completeing image uploading, upload data to firestore
              try {
                await updatePublicApi({
                  photoURL: downloadURL,
                });
                setImgLoading(false);
                notifications.show({
                  title: "Profile photo updated successfully",
                  message: "It may take some time to reflect changes to every pages",
                });
              } catch (error: any) {
                setImgLoading(false);
                console.log(error);
                notifications.show({
                  color: "red",
                  title: "Something went wrong",
                  message: error?.data?.message ? error?.data?.message : "There was an error updating your data.",
                });
              }
            });
          }
        );
      }
    } catch (error) {
      setImgLoading(false);
      notifications.show({
        color: "red",
        title: "Something went wrong",
        message: "There was an error updating your data.",
      });
      //
    }
  };

  return (
    <Container fluid>
      <NavigationProgress />
      {(isLoading || isFetching) && (
        <Box>
          <Loader />
        </Box>
      )}
      {user && !isLoading && !isFetching && (
        <Box w={"100%"}>
          <Text fz={"20px"} fw={"bold"}>
            Public Profile
          </Text>
          <Text c="dimmed">{user?.email}</Text>
          <Divider my="sm" />
          <Box>
            <Dropzone onDrop={handleImageDrop} openRef={openRef} p={40}>
              <Flex align={"center"} justify={"start"} gap={20}>
                <Avatar src={img} size={120} radius={12} />
                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Flex>
            </Dropzone>
            <br />
            <Button
              leftIcon={imgLoading ? <Loader size={"sm"} /> : ""}
              onClick={() => handleImageUpload()}
              variant="default"
            >
              Save new profile image
            </Button>
          </Box>
          <br />
          <br />
          <Text fz={"20px"} fw={"bold"}>
            Public details
          </Text>
          <Divider my="sm" />
          <Flex direction={"column"} gap={15} w={"100%"} my={20}>
            <Input.Wrapper label="Display Name">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" />
            </Input.Wrapper>
            <div>
              <Button
                leftIcon={publicLoading ? <Loader size={"sm"} /> : ""}
                onClick={() => !publicLoading && handlePublicDetalsSubmit()}
                variant="default"
              >
                Save Public details
              </Button>
            </div>
          </Flex>
          <br />
          <Text fz={"20px"} fw={"bold"}>
            Persional details
          </Text>
          <Divider my="sm" />
          <Flex direction={"column"} gap={15} w={"100%"} my={20}>
            <Grid>
              <Grid.Col span={6}>
                <Input.Wrapper label="Phone">
                  <Input
                    value={phone}
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Input.Wrapper label="Date of birth">
                  <Input type="date" placeholder="Date of birth" />
                </Input.Wrapper>
              </Grid.Col>
            </Grid>
            <Select
              label="Gender"
              placeholder="Gender"
              searchable
              defaultValue={gender}
              value={gender}
              onChange={setGender}
              nothingFound="No options"
              data={["male", "female", "other"]}
            />
            <div>
              <Button
                leftIcon={privateLoading ? <Loader size={"sm"} /> : ""}
                onClick={() => !privateLoading && HandlePersionalDetalsSubmit()}
                variant="default"
              >
                Save Persional details
              </Button>
            </div>
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default AccountProfilePage;
