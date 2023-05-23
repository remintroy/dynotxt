import { AppShell, Container, Footer } from "@mantine/core";
import HeaderComponent from "./header";
import { Outlet } from "react-router-dom";
import NavBarSubComponent from "./sidebar";
import { useState } from "react";
import LayoutFooterMobile from "./footerMoblie";

const NavBarComponent = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <AppShell
      padding="xs"
      header={<HeaderComponent navOpen={showNav} setNavOpen={setShowNav} />}
      // navbar={<NavBarSubComponent hidden={!showNav} />}
      footer={<LayoutFooterMobile />}
    >
      <>
        <Container size="xl" p={0}>
          <Outlet />
        </Container>
        <div className="dummy"></div>
      </>
    </AppShell>
  );
};

export default NavBarComponent;
