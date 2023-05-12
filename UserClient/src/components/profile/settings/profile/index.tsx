import { useEffect, useRef, useState } from "react";
import { useGetFullUserDataQuery } from "../../../../lib/api/authApi";
import { Avatar, Box, Button, Divider, Flex, Input, Loader, Select, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

const UserPublicProfileDataManagerComponent = () => {
  const { data: user, isLoading, isFetching } = useGetFullUserDataQuery({});
  const openRef = useRef<() => void>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<string | null>("");

  useEffect(() => {
    if (user) {
      setName(user?.name ?? "");
      setPhone(user?.phone ?? "");
      setGender(user?.gender ?? "");
    }
  }, [user]);

  return (
    <>
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
            <Dropzone onDrop={() => console.log("dropped")} openRef={openRef} p={40}>
              <Flex align={"center"} justify={"start"} gap={20}>
                <Avatar src={user?.photoURL} size={120} radius={12} />
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
            <Button variant="light">Save new profile image</Button>
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
              <Button variant="light">Save Public details</Button>
            </div>
          </Flex>
          <br />
          <Text fz={"20px"} fw={"bold"}>
            Persional details
          </Text>
          <Divider my="sm" />
          <Flex direction={"column"} gap={15} w={"100%"} my={20}>
            <Input.Wrapper label="Phone">
              <Input value={phone} type="number" onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
            </Input.Wrapper>
            <Input.Wrapper label="Date of birth">
              <Input type="date" placeholder="Date of birth" />
            </Input.Wrapper>
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
              <Button variant="light">Save Persional details</Button>
            </div>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default UserPublicProfileDataManagerComponent;
