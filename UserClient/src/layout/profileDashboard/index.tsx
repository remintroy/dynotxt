import { AppShell, Navbar } from "@mantine/core";
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
      <Outlet />
    </AppShell>
  );
};

export default ProfileDashboardLayout;
