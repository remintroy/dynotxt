import { Button, useMantineTheme } from "@mantine/core";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { useGetBlogDataDisplayQuery } from "../../../lib/api/blogApi";
import { useEffect } from "react";
import { addBlogToAllBlogsProfile, resetProfile, setAllBlogsMetaDataProfile } from "../../../lib/redux/profileSlice";
import usePathHook from "../../../hooks/usePath";
import PcProfileBlogsPageComponent from "./pc";
import MoblieProfileBlogPageComponent from "./mobile";

const ProfileBlogsPage = () => {
  const path = usePathHook();
  const dispatch = useAppDispatch();
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
    return () => {
      dispatch(resetProfile());
    };
  }, []);

  const { colorScheme } = useMantineTheme();

  return (
    <>
      {colorScheme == "dark" ? (
        <>
          <PcProfileBlogsPageComponent />
        </>
      ) : (
        <>
          <MoblieProfileBlogPageComponent />
        </>
      )}
    </>
  );
};

export default ProfileBlogsPage;
