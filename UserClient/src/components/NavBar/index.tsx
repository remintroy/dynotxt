import { AppShell, Footer } from "@mantine/core";
import HeaderComponent from "./Header";
import { Outlet } from "react-router-dom";
import NavBarSubComponent from "./NavBar";
import { useState } from "react";

const NavBarComponent = () => {

  const [showNav, setShowNav] = useState(false);

  return (
    <AppShell
      // padding="xl"
      header={<HeaderComponent navOpen={showNav} setNavOpen={setShowNav} />}
      navbar={<NavBarSubComponent hidden={!showNav} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0] },
      })}
    >
      <div className="AppContainerComponent">
        <Outlet />
        <div className="dummy"></div>
      </div>
    </AppShell>
  );
};

export default NavBarComponent;
