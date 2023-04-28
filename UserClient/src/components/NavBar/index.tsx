import { AppShell } from "@mantine/core";
import HeaderComponent from "./Header";
import { Outlet } from "react-router-dom";
import NavBarSubComponent from "./NavBar";

const NavBarComponent = () => {
  return (
    <AppShell
      padding="md"
      header={<HeaderComponent />}
      navbar={<NavBarSubComponent />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <div className="AppContainerComponent">
        <Outlet />
      </div>
    </AppShell>
  );
};

export default NavBarComponent;
