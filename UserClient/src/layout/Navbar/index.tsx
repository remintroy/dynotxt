import { AppShell, Container } from "@mantine/core";
import HeaderNavbarLayout from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import FooterNavbarLayout from "./Footer";
import usePathHook from "../../hooks/usePath";
const SidebarNavbarLayout = lazy(() => import("./Sidebar"));

const NavbarLayout = () => {
  const [showNav] = useState(false);

  /**
   * TO remove unnecessary routes that comes as a sideffect of logout or missing data of user
   */
  const navigate = useNavigate();
  const path = usePathHook();
  useEffect(() => {
    if (path[0] == "profile" && path[1] == "undefined") navigate("/");
  }, []);

  return (
    <AppShell
      padding="xs"
      header={<HeaderNavbarLayout />}
      navbar={
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarNavbarLayout hidden={!showNav} />
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
