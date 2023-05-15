import { Box, Button, Paper, Tabs } from "@mantine/core";
import { IconAccessPoint, IconLock, IconLogout, IconUser } from "@tabler/icons-react";
import UserPublicProfileDataManagerComponent from "./profile";
import TrashedBlogsComponent from "./trash";
import { IconTrash } from "@tabler/icons-react";
import { useLogOutMutation } from "../../../lib/api/authApi";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { logout } from "../../../lib/redux/userSlice";

const SettingsComponent = () => {
  const [logoutApi] = useLogOutMutation();
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApi({});
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box py={10}>
        <Paper w={"100%"}>
          <Tabs defaultValue="profile" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab icon={<IconUser size="20px" />} value="profile">
                Profile
              </Tabs.Tab>
              <Tabs.Tab icon={<IconTrash size="20px" />} value="trash">
                Trash
              </Tabs.Tab>
              <Tabs.Tab icon={<IconLock size="20px" />} value="security">
                security
              </Tabs.Tab>
              <Tabs.Tab icon={<IconAccessPoint size="20px" />} value="account">
                Account
              </Tabs.Tab>
            </Tabs.List>
            <Box px={20} w={"100%"}>
              <Tabs.Panel value="profile">
                <UserPublicProfileDataManagerComponent />
              </Tabs.Panel>
              <Tabs.Panel value="trash">
                <TrashedBlogsComponent />
              </Tabs.Panel>
              <Tabs.Panel value="security">Settings tab content</Tabs.Panel>
              <Tabs.Panel value="account">
                <Button leftIcon={<IconLogout size={"20px"} />} variant="default" onClick={() => logoutHandler()}>
                  Logout
                </Button>
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Paper>
      </Box>
    </div>
  );
};

export default SettingsComponent;
