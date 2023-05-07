import { Box, Burger, Button, Code, Header, Input, Loader, MediaQuery, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useAppSelector } from "../../../lib/redux/hooks";
import { Link } from "react-router-dom";

const HeaderComponent = ({ navOpen: opened, setNavOpen: setOpened }: { navOpen: boolean, setNavOpen: any }) => {
  const theme = useMantineTheme();
  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.loading);

  return (
    <Header height={{ base: 50, md: 70 }} p="xl">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger opened={opened} onClick={() => setOpened((o: any) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl" />
          </MediaQuery>
          <Text fw={700} fz="md" tt="uppercase">
            Dynotxt
          </Text>
        </div>
        <div className="right" style={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Input
                placeholder="Search"
                icon={<IconSearch size={"15px"} />}
                rightSection={
                  <Tooltip label="Search shortcut" withArrow color="gray">
                    <Code sx={{ cursor: "default" }}>/</Code>
                  </Tooltip>
                }
              />
            </MediaQuery>
            {(user || userLoading) && (
              <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <Link className="link" to="/blog/create">
                  <Button variant="outline" leftIcon={userLoading ? <Loader size="20px" /> : <IconPlus size="20px" />}>
                    Create Blog
                  </Button>
                </Link>
              </MediaQuery>
            )}
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <IconSearch size={"25px"} />
            </MediaQuery>
          </Box>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
