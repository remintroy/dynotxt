import { AppShell, Avatar, Container } from "@mantine/core";
import HeaderNavbarLayout from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import FooterNavbarLayout from "./Footer";
import usePathHook from "../../hooks/usePath";
import { SpotlightProvider } from "@mantine/spotlight";
import useBlogSearchHook from "../../hooks/useBlogSearch";
const SidebarNavbarLayout = lazy(() => import("./Sidebar"));

const NavbarLayout = () => {
  const [showNav, setShowNav] = useState(false);

  /**
   * TO remove unnecessary routes that comes as a sideffect of logout or missing data of user
   */
  const navigate = useNavigate();
  const path = usePathHook();
  useEffect(() => {
    if (path[0] == "profile" && path[1] == "undefined") navigate("/");
  }, []);

  const { data, setQuery } = useBlogSearchHook();
  const onTrigger = (event: any) => {
    navigate(`/blog/${event?.id}`);
  };
  const [actions, setActions] = useState<any>([]);

  useEffect(() => {
    setActions(
      data?.map((blog: any) => {
        return {
          id: blog?.blogId,
          title: blog?.title,
          keywords: blog?.category,
          onTrigger,
          icon: <Avatar src={blog?.bannerImgURL} />,
        };
      })
    );
  }, [data]);

  return (
    <SpotlightProvider
      shortcut={["mod + K", "/"]}
      onChange={(e: any) => setQuery(e.target.value)}
      searchPlaceholder="Search blogs"
      actions={actions}
      nothingFoundMessage="No blogs found "
    >
      <AppShell
        padding="xs"
        header={<HeaderNavbarLayout opened={showNav} setNavOpen={setShowNav} />}
        navbar={
          // <Suspense fallback={<div>Loading...</div>}>
          <SidebarNavbarLayout hidden={!showNav} setHidden={setShowNav} />
          // </Suspense>
        }
        footer={<FooterNavbarLayout />}
      >
        <>
          <Container fluid p={0}>
            <Outlet />
          </Container>
          {/* <div className="dummy"></div> */}
        </>
      </AppShell>
    </SpotlightProvider>
  );
};

export default NavbarLayout;
