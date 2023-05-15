import {
  Box,
  Button,
  Code,
  NavLink,
  Navbar,
  ScrollArea,
  Switch,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { UserButton } from "../userButton";
import { IconCompass, IconHome, IconLogin, IconMoonStars, IconSettings, IconSun } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../lib/redux/hooks";

const NavBarSubComponent = ({ hidden }: { hidden: boolean }) => {
  const user = useAppSelector((state) => state.user.data);
  const loading = useAppSelector((state) => state.user.loading);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const location = useLocation();
  const path = location.pathname.split("/").filter((e) => e);

  return (
    <Navbar
      p="xs"
      width={{
        md: 300,
        lg: 300,
        base: 0,
      }}
      hiddenBreakpoint="md"
      hidden={hidden}
    >
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
        <Link to="/" className="link">
          <NavLink
            variant="light"
            icon={<IconHome />}
            active={path.length == 0}
            label="Home"
            description="Home sweet home"
          />
        </Link>
        {/* <NavLink variant="light" icon={<IconMessage />} label="Chats" description="2 new requests" /> */}
        {/* <NavLink variant="light" label="Explore" description="New arrivals " icon={<IconCompass />} /> */}
      </Navbar.Section>

      <Navbar.Section>
        {(user || loading) && (
          <Link className="link" to={`/profile/${user?.uid}`}>
            <UserButton
              email={user?.email || "test@example.com"}
              image={user?.photoURL as string}
              name={user?.name as string}
            />
          </Link>
        )}
        {!user && !loading && (
          <Tooltip label="Got to login page" color="gray" withArrow>
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
