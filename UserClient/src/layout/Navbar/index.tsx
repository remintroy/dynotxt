import { AppShell, Container } from "@mantine/core";
import HeaderNavbarLayout from "./Header";
import { Outlet } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import FooterNavbarLayout from "./Footer";
const SidebarNavbarLayout = lazy(() => import("./Sidebar"));

const NavbarLayout = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <AppShell
      padding="xs"
      header={<HeaderNavbarLayout navOpen={showNav} setNavOpen={setShowNav} />}
      navbar={
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarNavbarLayout hidden={!showNav} setHidden={setShowNav} />
        </Suspense>
      }
      footer={<FooterNavbarLayout />}
    >
      <>
        <Container fluid p={0}>
          <Outlet />
        </Container>
        <div className="dummy"></div>
      </>
    </AppShell>
  );
};

export default NavbarLayout;
