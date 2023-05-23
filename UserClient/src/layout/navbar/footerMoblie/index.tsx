import { ActionIcon, Box, Flex, Footer, Grid } from "@mantine/core";
import { IconHome, IconNotification, IconSearch, IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../lib/redux/hooks";

const LayoutFooterMobile = () => {
  const innerStyleButton = {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "100%",
    height: "100%",
  };
  const linkStyle = { width: "100%", height: "100%", padding: "0" };
  const user = useAppSelector((state) => state.user.data);
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  return (
    <>
      {!thisIsPc && (
        <Footer height={55}>
          <Grid align={"center"} justify={"space-between"} h={"100%"} m={0}>
            <Grid.Col span={3} display="flex" sx={innerStyleButton}>
              <Link to={"/"} style={linkStyle}>
                <ActionIcon w={"100%"} h={"90%"} p={0}>
                  <IconHome />
                </ActionIcon>
              </Link>
            </Grid.Col>
            <Grid.Col span={3} display="flex" sx={innerStyleButton}>
              <Link to={"#"} style={linkStyle}>
                <ActionIcon w={"100%"} h={"90%"} p={0}>
                  <IconSearch />
                </ActionIcon>
              </Link>
            </Grid.Col>
            <Grid.Col span={3} display="flex" sx={innerStyleButton}>
              <Link to={"#"} style={linkStyle}>
                <ActionIcon w={"100%"} h={"90%"} p={0}>
                  <IconNotification />
                </ActionIcon>
              </Link>
            </Grid.Col>
            <Grid.Col span={3} display="flex" sx={innerStyleButton}>
              <Link to={`/profile/${user?.uid}`} style={linkStyle}>
                <ActionIcon w={"100%"} h={"90%"} p={0}>
                  <IconSettings />
                </ActionIcon>
              </Link>
            </Grid.Col>
          </Grid>
        </Footer>
      )}
    </>
  );
};

export default LayoutFooterMobile;
