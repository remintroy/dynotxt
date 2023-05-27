import { AppShell, Container, Navbar } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import HeaderComponent from "./header";
import NavBarSubComponent from "./sidebar";

const ProfileDashboardLayout = () => {
  const [navbar, setShowNav] = useState(false);

  return (
    <AppShell
      header={<HeaderComponent navOpen={navbar} setNavOpen={setShowNav} />}
      navbar={<NavBarSubComponent hidden={!navbar} />}
    >
      <Container fluid p={0}>
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default ProfileDashboardLayout;
