import { Box, Burger, Button, Code, Header, Input, Loader, MediaQuery, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.loading);

  return (
    <Header height={{ base: 50, md: 70 }} p="xl">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl" />
          </MediaQuery>
          <Text fw={700} fz="md" tt="uppercase">
            Dynotxt
          </Text>
        </div>
        <div className="right" style={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              placeholder="Search"
              icon={<IconSearch size={"15px"} />}
              rightSection={
                <Tooltip label="Search shortcut" withArrow color="gray">
                  <Code sx={{ cursor: "default" }}>/</Code>
                </Tooltip>
              }
            />
            {(user || userLoading) && (
              <Link className="link" to="/blog/create">
                <Button variant="outline" leftIcon={userLoading ? <Loader size="20px" /> : <IconPlus size="20px" />}>
                  Create Blog
                </Button>
              </Link>
            )}
          </Box>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
