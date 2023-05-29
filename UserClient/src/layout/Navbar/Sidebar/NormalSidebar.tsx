import usePathHook from "../../../hooks/usePath";
import { ActionIcon, Box, Flex, Kbd, NavLink, Navbar, ScrollArea, Switch, Text, Tooltip, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconCompass, IconFileAnalytics, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { IconHome } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IconSun } from "@tabler/icons-react";
import { IconMoonStars } from "@tabler/icons-react";
import { useFullscreen } from "@mantine/hooks";
import useUserDataHook from "../../../hooks/useUserData";

const NormalSidebarLayoutComponent = () => {
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
        <Link to="/" className="link" aria-label="Go to home page button">
          <NavLink sx={{ borderRadius: 5 }} variant="filled" icon={<IconHome />} active={path.length == 0} label="Home" description="Home sweet home" />
        </Link>
        <Link to={`/profile/${user?.uid}/blogs`} className="link" aria-label="Manage blogs button">
          <NavLink sx={{ borderRadius: 5 }} variant="filled" icon={<IconFileAnalytics />} label="Blogs" description="view and manage your blogs" />
        </Link>
        <NavLink sx={{ borderRadius: 5 }} variant="filled" icon={<IconCompass />} label="Explore" description="New arrivals " />
      </Navbar.Section>
    </>
  );
};

export default NormalSidebarLayoutComponent;
