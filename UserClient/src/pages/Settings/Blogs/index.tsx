import { useEffect } from "react";
import usePathHook from "../../../hooks/usePath";
import { Box, Tabs } from "@mantine/core";
import { IconFileAnalytics, IconTrash } from "@tabler/icons-react";
import useThisIsPcHook from "../../../hooks/useThisIsPc";
import ProfilePcTrashedBlogsSubPage from "./BlogsPcTrashedView";
import ProfilePcAllBlogsTableSubPage from "./BlogsPcAllView";
import BlogMbTrashedBlogsSubPage from "./BlogMbTrashedView";
import BlogMbAllBlogsSubPage from "./BlogMbAllView";
import useUserDataHook from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";
import useUserDataLoadingHook from "../../../hooks/useUserDataLoading";

const BlogsSettingsPage = () => {
  const path = usePathHook();
  const thisIsPc = useThisIsPcHook();
  const user = useUserDataHook();
  const userDataLoading = useUserDataLoadingHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDataLoading && user?.uid !== path[1]) navigate(`/profile/${path[1]}`);
  }, [user]);

  return (
    <Box style={{ padding: thisIsPc ? "20px" : 5 }}>
      <h2>Manage your blogs</h2>
      <Tabs defaultValue="allblogs">
        <Tabs.List>
          <Tabs.Tab value="allblogs" icon={<IconFileAnalytics size="1rem" />}>
            AllBlogs
          </Tabs.Tab>
          {/* <Tabs.Tab value="bloglist" icon={<IconList size="1rem" />}>
            Blog list
          </Tabs.Tab> */}
          <Tabs.Tab value="trashed" icon={<IconTrash size="1rem" />}>
            Trashed
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="allblogs" pt="xs">
          {thisIsPc ? <ProfilePcAllBlogsTableSubPage /> : <BlogMbAllBlogsSubPage />}
        </Tabs.Panel>

        <Tabs.Panel value="trashed" pt="xs">
          {thisIsPc ? <ProfilePcTrashedBlogsSubPage /> : <BlogMbTrashedBlogsSubPage />}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default BlogsSettingsPage;
