import { useAppDispatch } from "../../../lib/redux/hooks";
import { useGetBlogDataDisplayQuery } from "../../../lib/api/blogApi";
import { useEffect } from "react";
import { addBlogToAllBlogsProfile, resetProfile, setAllBlogsMetaDataProfile } from "../../../lib/redux/slices/profile";
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

const BlogsSettingsPage = () => {
  const path = usePathHook();
  const thisIsPc = useThisIsPcHook();
  const dispatch = useAppDispatch();
  const user = useUserDataHook();
  const navigate = useNavigate();
  const { data: blogsData } = useGetBlogDataDisplayQuery({ uid: path[1], page: 1 });
  useEffect(() => {
    // assignig AllBlogs data to redux
    if (blogsData) {
      blogsData?.docs?.forEach((blog: any) => {
        dispatch(addBlogToAllBlogsProfile(blog));
      });
      let allBlogsMetaData: any = JSON.stringify(blogsData);
      allBlogsMetaData = JSON.parse(allBlogsMetaData);
      allBlogsMetaData.docs = null;
      dispatch(setAllBlogsMetaDataProfile(allBlogsMetaData));
    }
  }, [blogsData]);

  useEffect(() => {
    if (user?.uid !== path[1]) navigate(`/profile/${path[1]}`);
    return () => {
      dispatch(resetProfile());
    };
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
