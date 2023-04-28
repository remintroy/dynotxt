import {
  Box,
  Button,
  Code,
  NavLink,
  Navbar,
  Popover,
  ScrollArea,
  Switch,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { UserButton } from "../UserButton";
import { IconCompass, IconHome, IconLogin, IconMessage, IconMoonStars, IconSettings, IconSun } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";

const NavBarSubComponent = () => {
  const user = useAppSelector((state) => state.user.data);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Navbar
      p="xs"
      width={{
        sm: 300,
        lg: 300,
        base: 100,
      }}
    >
      <Navbar.Section mt="xs">
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", paddingTop: "0" }}
        >
          <Tooltip label="Toggle theme shortcut" color="gray" withArrow>
            <Text sx={{ cursor: "default" }} span>
              <Code>Ctl+J</Code>
            </Text>
          </Tooltip>
          <Switch
            checked={dark}
            size="md"
            onChange={(e) => toggleColorScheme()}
            color={theme.colorScheme === "dark" ? "gray" : "dark"}
            onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
            offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
          />
        </Box>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <NavLink variant="light" icon={<IconHome />} label="Home" description="Home sweet home" />
        <NavLink variant="light" icon={<IconMessage />} label="Chats" description="2 new requests" />
        <NavLink variant="light" label="Expore" description="New arrivals " icon={<IconCompass />} />
      </Navbar.Section>

      <Navbar.Section>
        {user && (
          <UserButton
            email={user?.email || "test@example.com"}
            image={user?.photoURL as string}
            name={user?.name as string}
            icon={
              <Tooltip label="Go to account settings" withArrow color="gray">
                <Link className="link" to="/settings/account">
                  <IconSettings />
                </Link>
              </Tooltip>
            }
          />
        )}
        {!user && (
          <Tooltip label="Wait. Who are you ?" color="gray" withArrow>
            <Link to="/auth/signin" className="link">
              <Button variant="outline" fullWidth h="50px">
                <IconLogin className="txtInLink" size="20px" /> Login
              </Button>
            </Link>
          </Tooltip>
        )}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavBarSubComponent;
