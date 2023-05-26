import {
  Avatar,
  Box,
  Burger,
  Button,
  Code,
  Header,
  Input,
  Loader,
  MediaQuery,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useAppSelector } from "../../../lib/redux/hooks";
import { useCreateNewBlogMutation } from "../../../lib/api/blogApi";
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent = ({ navOpen: opened, setNavOpen: setOpened }: { navOpen: boolean; setNavOpen: any }) => {
  const theme = useMantineTheme();
  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.loading);

  const [createNewBlog] = useCreateNewBlogMutation();
  const navigate = useNavigate();

  const handleCreateNewBlog = async () => {
    try {
      const response: any = await createNewBlog({});
      const { blogId } = response.data;
      navigate(`/blog/edit/${blogId}`);
    } catch (error) {
      //  error handling
      console.log(error);
    }
  };

  return (
    <Header height={{ base: 50, md: 70 }} p="xl">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="lg" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o: any) => !o)}
              size="sm"
              color={theme.colors.gray[7]}
              mr="xl"
            />
          </MediaQuery>
          <Link className="link" to="/">
            <Text fw={700} fz="md" tt="uppercase">
              Dynotxt
            </Text>
          </Link>
        </div>
        <div className="right" style={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Input
                placeholder="Search"
                icon={<IconSearch size={"15px"} />}
                rightSection={
                  <Tooltip label="Search shortcut" withArrow color="gray">
                    <Code sx={{ cursor: "default" }}>/</Code>
                  </Tooltip>
                }
              />
            </MediaQuery>
            {(user || userLoading) && (
              <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <Button
                  onClick={() => !userLoading && handleCreateNewBlog()}
                  variant="outline"
                  leftIcon={userLoading ? <Loader size="20px" /> : <IconPlus size="20px" />}
                >
                  Create Blog
                </Button>
              </MediaQuery>
            )}
            {user && (
              <Link to={`/profile/${user.uid}`}>
                <Avatar src={user.photoURL} radius={"xl"} />
              </Link>
            )}

            {!user && (
              <Link to="/auth/signin">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </Box>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
