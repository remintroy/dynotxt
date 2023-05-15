import { AppShell } from "@mantine/core";
import HeaderComponent from "./header";
import { Outlet } from "react-router-dom";
import NavBarSubComponent from "./sidebar";
import { useState } from "react";

const NavBarComponent = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <AppShell
      // padding="xl"
      header={<HeaderComponent navOpen={showNav} setNavOpen={setShowNav} />}
      navbar={<NavBarSubComponent hidden={!showNav} />}
    >
      <div className="AppContainerComponent" id="AppContainerComponent">
        <Outlet />
        <div className="dummy"></div>
      </div>
    </AppShell>
  );
};

export default NavBarComponent;
