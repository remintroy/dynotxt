import usePathHook from "../../../hooks/usePath";
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Flex,
  Kbd,
  NavLink,
  Navbar,
  ScrollArea,
  Switch,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconDashboard, IconFileAnalytics, IconMaximize, IconMinimize, IconSearch, IconSettings } from "@tabler/icons-react";
import { IconHome } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IconSun } from "@tabler/icons-react";
import { IconMoonStars } from "@tabler/icons-react";
import { useFullscreen } from "@mantine/hooks";
import useUserDataHook from "../../../hooks/useUserData";

const NormalSidebarLayoutComponent = ({ setClose }: any) => {
  const user = useUserDataHook();
  const path = usePathHook();
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();
  const { toggle, fullscreen } = useFullscreen();

  return (
    <>
      <Navbar.Section mt="xs">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            paddingTop: "0",
          }}
        >
          <Tooltip label="Toggle theme shortcut" withArrow>
            <Text sx={{ cursor: "default" }} span>
              <Kbd>Ctl+J</Kbd>
            </Text>
          </Tooltip>
          <Flex align={"center"} gap={10}>
            <Switch
              title="Toggle theme button"
              checked={theme.colorScheme === "dark"}
              size="md"
              onChange={() => toggleColorScheme()}
              color={theme.colorScheme === "dark" ? "gray" : "dark"}
              onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
              offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
            />
            <Tooltip label="Toggle full screen view" withArrow>
              <ActionIcon aria-label="Toggle full screen view" onClick={() => toggle()}>
                {fullscreen ? <IconMinimize size={"20px"} /> : <IconMaximize size={"20px"} />}
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Link to="/" onClick={() => setClose && setClose(false)} className="link" aria-label="Go to home page button">
          <NavLink sx={{ borderRadius: 5 }} variant="filled" icon={<IconHome />} active={path.length == 0} label="Home" description="Home sweet home" />
        </Link>
        <NavLink sx={{ borderRadius: 5 }} variant="filled" icon={<IconSearch />} label="Explore" description="New arrivals " />
        <Divider my={10} />
        {user && (
          <>
            <Link onClick={() => setClose && setClose(false)} to={`/profile/${user?.uid}/dashboard`} className="link" aria-label="Account Dashboard button">
              <NavLink
                sx={{ borderRadius: 5 }}
                variant="filled"
                icon={<IconDashboard />}
                active={path[0] == "profile" && path[1] == `${user?.uid}` && path[2] == "dashboard"}
                label="Dashboard"
                description="Know your account"
              />
            </Link>
            <Link onClick={() => setClose && setClose(false)} to={`/profile/${user?.uid}/blogs`} className="link" aria-label="Manage blogs button">
              <NavLink
                sx={{ borderRadius: 5 }}
                variant="filled"
                icon={<IconFileAnalytics />}
                active={path[0] == "profile" && path[1] == `${user?.uid}` && path[2] == "blogs"}
                label="Your Blogs"
                description="view and manage your blogs"
              />
            </Link>
          </>
        )}
      </Navbar.Section>

      <Navbar.Section>
        {user && (
          <Link onClick={() => setClose && setClose(false)} to={`/profile/${user?.uid}/account`} className="link">
            <NavLink
              sx={{ borderRadius: 5 }}
              active={path[0] == "profile" && path[1] == `${user?.uid}` && path[2] == "account"}
              label={user?.name}
              description={user?.email}
              variant="filled"
              icon={<Avatar src={user?.photoURL} radius="xl" />}
              rightSection={<IconSettings size={"20px"} />}
            />
          </Link>
        )}
      </Navbar.Section>
    </>
  );
};

export default NormalSidebarLayoutComponent;
