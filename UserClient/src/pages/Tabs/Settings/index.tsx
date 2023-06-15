import { Box, Divider, Flex, NavLink, Switch, Text, Transition, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { IconLogout, IconSun } from "@tabler/icons-react";
import { IconMinimize } from "@tabler/icons-react";
import { IconMaximize } from "@tabler/icons-react";
import { IconMoonStars } from "@tabler/icons-react";
import { IconFileAnalytics, IconHome2, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserDataHook from "../../../hooks/useUserData";
import { modals } from "@mantine/modals";
import useAuthHook from "../../../hooks/useAuth";

const SettingsTabPage = () => {
  const user = useUserDataHook();
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();
  const { toggle, fullscreen } = useFullscreen();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { logout } = useAuthHook();

  const handleLogout = () => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color: "red" },
      children: <Text size="sm">This will logout you current session</Text>,
      labels: { confirm: "Logout", cancel: "Cancel" },
      onConfirm: async () => {
        logout();
      },
    });
  };

  return (
    <Transition mounted={mounted} transition="fade" duration={300} timingFunction="ease">
      {(styles) => (
        <Box style={styles}>
          <Text fz={"xl"} fw={"bold"} my={10} p={10}>
            Settings
          </Text>
          <Flex direction={"column"} gap={10} mt={20}>
            {user && (
              <>
                <Link to={`/profile/${user?.uid}/account`} className="link">
                  <NavLink label="My Account" description="manage your account" variant="light" icon={<IconUser size="1.5rem" stroke={1.5} />} />
                </Link>
                <Link to={`/profile/${user?.uid}/dashboard`} className="link">
                  <NavLink label="Dashboard" description="view your overall perfomance" variant="light" icon={<IconHome2 size="1.5rem" stroke={1.5} />} />
                </Link>
                <Link to={`/profile/${user?.uid}/blogs`} className="link">
                  <NavLink label="Your Blogs" description="view, edit, analytics" variant="light" icon={<IconFileAnalytics size="1.5rem" stroke={1.5} />} />
                </Link>
                <Divider />
              </>
            )}
            <NavLink
              label="Theme"
              description="dark and light"
              variant="light"
              icon={
                theme.colorScheme === "dark" ? (
                  <IconMoonStars size="1.5rem" stroke={2.5} color={theme.colors.blue[6]} />
                ) : (
                  <IconSun size="1.5rem" stroke={2.5} color={theme.colors.blue[4]} />
                )
              }
              rightSection={
                <Switch
                  title="Toggle theme button"
                  checked={theme.colorScheme === "dark"}
                  size="md"
                  onChange={() => toggleColorScheme()}
                  color={theme.colorScheme === "dark" ? "gray" : "dark"}
                  onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
                  offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
                />
              }
            />
            <NavLink
              label="Full screen"
              description="View app in full screen mode"
              variant="light"
              icon={fullscreen ? <IconMinimize size="1.5rem" stroke={2.5} /> : <IconMaximize size="1.5rem" stroke={2.5} />}
              rightSection={
                <Switch
                  title="Toggle theme button"
                  checked={fullscreen}
                  size="md"
                  onChange={() => toggle()}
                  color={theme.colorScheme === "dark" ? "gray" : "dark"}
                />
              }
            />
            {user && (
              <NavLink onClick={handleLogout} label="Logout" description="Logout of your account in this device" variant="light" icon={<IconLogout />} />
            )}
          </Flex>
        </Box>
      )}
    </Transition>
  );
};

export default SettingsTabPage;
