import { AppShell, Container } from "@mantine/core";
import HeaderComponent from "./header";
import { Outlet } from "react-router-dom";
import NavBarSubComponent from "./sidebar";
import { useState } from "react";

const NavBarComponent = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <AppShell
      padding="sm"
      header={<HeaderComponent navOpen={showNav} setNavOpen={setShowNav} />}
      // navbar={<NavBarSubComponent hidden={!showNav} />}
    >
      <>
        <Container size="xl">
          <Outlet />
        </Container>
        <div className="dummy"></div>
      </>
    </AppShell>
  );
};

export default NavBarComponent;
