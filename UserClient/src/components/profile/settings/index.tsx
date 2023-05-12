import { Box, Card, Tabs } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import UserPublicProfileDataManagerComponent from "./profile";
import { IconShield } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";

const SettingsComponent = () => {
  return (
    <div>
      <Box py={10}>
        <Card withBorder w={"100%"}>
          NOTE: Settings update my take some times to reflect everywhere
          <br />
          <br />
          <Tabs defaultValue="profile" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab icon={<IconUser size="20px" />} value="profile">
                Profile
              </Tabs.Tab>
              <Tabs.Tab icon={<IconTrash size="20px" />} value="trash">
                Trash
              </Tabs.Tab>
              <Tabs.Tab icon={<IconShield size="20px" />} value="security">
                security
              </Tabs.Tab>
            </Tabs.List>
            <Box px={20} w={"100%"}>
              <Tabs.Panel value="profile">
                <UserPublicProfileDataManagerComponent />
              </Tabs.Panel>
              <Tabs.Panel value="trash">Messages tab content</Tabs.Panel>
              <Tabs.Panel value="security">Settings tab content</Tabs.Panel>
            </Box>
          </Tabs>
        </Card>
      </Box>
    </div>
  );
};

export default SettingsComponent;
