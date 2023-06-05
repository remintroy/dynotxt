import { Drawer, MediaQuery, Navbar } from "@mantine/core";
import useSidebarHook from "../../../hooks/useSidebar";
import NormalSidebarLayoutComponent from "./NormalSidebar";

const SidebarNavbarLayout = ({ hidden, setHidden }: any) => {
  const { showSidebar } = useSidebarHook();

  return (
    <>
      {showSidebar && (
        <>
          <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <MediaQuery
              largerThan={"md"}
              styles={{ display: "none" }}
              children={
                <Drawer opened={!hidden} title="Dynotxt" size={"300px"} onClose={() => setHidden(false)}>
                  <Navbar
                    p="xs"
                    width={{
                      md: 300,
                      lg: 300,
                      base: 0,
                    }}
                    hiddenBreakpoint="md"
                    hidden={hidden}
                  >
                    <NormalSidebarLayoutComponent setClose={setHidden} />
                  </Navbar>
                </Drawer>
              }
            />
          </MediaQuery>
          <MediaQuery
            smallerThan={"md"}
            styles={{ display: "none" }}
            children={
              <Navbar
                p="xs"
                width={{
                  md: 300,
                  lg: 300,
                  base: 0,
                }}
                hiddenBreakpoint="md"
                hidden={hidden}
              >
                <NormalSidebarLayoutComponent />
              </Navbar>
            }
          />
        </>
      )}
    </>
  );
};

export default SidebarNavbarLayout;
