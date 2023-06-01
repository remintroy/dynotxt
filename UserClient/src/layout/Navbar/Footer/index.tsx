import { ActionIcon, Footer, Grid, MediaQuery, useMantineTheme } from "@mantine/core";
import useUserDataHook from "../../../hooks/useUserData";
import { Link } from "react-router-dom";
import { IconBell, IconHome, IconHome2, IconSearch, IconSettings } from "@tabler/icons-react";
import usePathHook from "../../../hooks/usePath";
import { useMediaQuery } from "@mantine/hooks";

const FooterNavbarLayout = () => {
  const innerStyleButton = {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "100%",
    height: "100%",
  };
  const linkStyle = { width: "100%", height: "100%", padding: "0" };
  const user = useUserDataHook();
  const theme = useMantineTheme();
  const buttonColor = theme.colorScheme == "dark" ? "#fff" : "#000";
  const path = usePathHook();
  const isMd = useMediaQuery("(max-width:991px)");

  return (
    <>
      <MediaQuery
        largerThan={"sm"}
        styles={{
          display: "none",
        }}
        children={
          <Footer height={isMd ? 55 : 0}>
            <Grid align={"center"} justify={"space-between"} h={"100%"} m={0}>
              <Grid.Col span={3} display="flex" sx={innerStyleButton}>
                <Link aria-label="Go to home page" to={"/"} style={linkStyle}>
                  <ActionIcon aria-label="Go to home page" w={"100%"} h={"90%"} p={0}>
                    {path.length == 0 ? <IconHome2 color={buttonColor} /> : <IconHome color={buttonColor} />}
                  </ActionIcon>
                </Link>
              </Grid.Col>
              <Grid.Col span={3} display="flex" sx={innerStyleButton}>
                <Link aria-label="Go to search page" to={"#"} style={linkStyle}>
                  <ActionIcon aria-label="Go to search page" w={"100%"} h={"90%"} p={0}>
                    <IconSearch color={buttonColor} />
                  </ActionIcon>
                </Link>
              </Grid.Col>
              <Grid.Col span={3} display="flex" sx={innerStyleButton}>
                <Link aria-label="Go to notifications page" to={"#"} style={linkStyle}>
                  <ActionIcon aria-label="Go to notifications page" w={"100%"} h={"90%"} p={0}>
                    <IconBell color={buttonColor} />
                  </ActionIcon>
                </Link>
              </Grid.Col>
              <Grid.Col span={3} display="flex" sx={innerStyleButton}>
                <Link aria-label="Go to settings page" to={`/profile/${user?.uid}/dashboard`} style={linkStyle}>
                  <ActionIcon aria-label="Go to settings page" w={"100%"} h={"90%"} p={0}>
                    <IconSettings color={buttonColor} />
                  </ActionIcon>
                </Link>
              </Grid.Col>
            </Grid>
          </Footer>
        }
      />
    </>
  );
};

export default FooterNavbarLayout;
