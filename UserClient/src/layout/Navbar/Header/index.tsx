import { Avatar, Box, Burger, Button, Header, Loader, MediaQuery, Text, useMantineTheme } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useCreateNewBlogMutation } from "../../../lib/api/blogApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import { IconPlus } from "@tabler/icons-react";
import NotificationPopupComponent from "../../../components/NotificationPopup";

const HeaderNavbarLayout = ({ opened, setNavOpen }: any) => {
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
          <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Box>
                <Burger aria-label="Open sidebar" opened={opened} onClick={() => setNavOpen((o: any) => !o)} size="sm" color={theme.colors.gray[7]} mr="xl" />
              </Box>
            </MediaQuery>
          </MediaQuery>
          <Link className="link" to="/">
            <Text fw={700} fz="md" tt="uppercase">
              Dynotxt
            </Text>
          </Link>
        </div>
        <div className="right" style={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {(user || userLoading) && (
              <>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                  <Button
                    onClick={() => !userLoading && handleCreateNewBlog()}
                    variant="default"
                    leftIcon={userLoading ? <Loader size="20px" /> : <IconPlus size="20px" />}
                  >
                    Create Blog
                  </Button>
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                  <Box>
                    <NotificationPopupComponent />
                  </Box>
                </MediaQuery>
              </>
            )}

            {user && (
              <>
                <Link to={`/profile/${user.uid}`}>
                  <Avatar alt="Profile photo" src={user.photoURL} radius={"xl"} />
                </Link>
              </>
            )}

            {!user && (
              <Link to="/auth/signin">
                <Button variant="default">Login</Button>
              </Link>
            )}
          </Box>
        </div>
      </div>
    </Header>
  );
};

export default HeaderNavbarLayout;
