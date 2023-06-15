import { ActionIcon, Box, Chip, Flex, Image, Loader, Menu, Paper, Select, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { IconDotsVertical, IconEdit, IconMessage } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconThumbUp } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import {
  useDeleteBlogWithBlogIdMutation,
  useGetBlogDataDisplayQuery,
  usePutPublishBlogMutation,
  usePutUnPublishBlogMutation,
} from "../../../../lib/api/blogApi";
import { addBlogToAllBlogsProfile, resetProfileBlogs, setAllBlogsMetaDataProfile } from "../../../../lib/redux/slices/profile";
import { useCallback, useEffect, useRef, useState } from "react";
import usePathHook from "../../../../hooks/usePath";
import { IconSort90 } from "@tabler/icons-react";
import { IconSort09 } from "@tabler/icons-react";
import { IconSortAZ } from "@tabler/icons-react";
import { IconSortZA } from "@tabler/icons-react";

const BlogMbAllBlogsSubPage = () => {
  const path = usePathHook();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: "date" | "updated" | "views" | "likes"; order: -1 | 1 }>({ key: "updated", order: -1 });
  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);
  const allBlogsMetaData = useAppSelector((state) => state.profile.allBlogsMetaData);
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const dateFormatter = Intl.DateTimeFormat("us", { dateStyle: "short" });
  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();
  const dispatch = useAppDispatch();

  const { data: blogsData, isLoading, isFetching, refetch } = useGetBlogDataDisplayQuery({ uid: path[1], page, sort });

  const setAllBlogs = () => {
    if (blogsData) {
      blogsData?.docs?.forEach((blog: any) => {
        dispatch(addBlogToAllBlogsProfile(blog));
      });
      let allBlogsMetaData: any = JSON.stringify(blogsData);
      allBlogsMetaData = JSON.parse(allBlogsMetaData);
      allBlogsMetaData.docs = null;
      dispatch(setAllBlogsMetaDataProfile(allBlogsMetaData));
    }
  };

  useEffect(() => {
    setAllBlogs();
    // assignig AllBlogs data to redux
  }, [blogsData]);

  const blogActionHandler = async (apiCallFuntion: any, blogId: string) => {
    try {
      nprogress.set(0);
      nprogress.start();
      // calling currsponding api
      const response = await apiCallFuntion(blogId).unwrap();
      nprogress.complete();
      return response;
    } catch (error: any) {
      nprogress.complete();
      notifications.show({
        color: "red",
        title: "Oops something went wrong",
        message: error?.data?.error ?? "There was an error diring updating blog visiblity. Consier trying agter sometime",
      });
      return false;
    }
  };

  const handleConfirmation = async (actionApi: any, blogId: string, message: string, button: string, color?: string) => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color },
      children: <Text size="sm">{message}</Text>,
      labels: { confirm: button, cancel: "Cancel" },
      onConfirm: () => {
        blogActionHandler(actionApi, blogId);
      },
    });
  };

  const makePublic = (blogId: string) => {
    handleConfirmation(
      makePublicApi,
      blogId,
      "This change the visiblity of this blog to pubic. Your will be shared and listed in searchs and can be seen by anyone.",
      "Make public"
    );
  };

  const makePrivate = (blogId: string) => {
    handleConfirmation(
      makePrivateApi,
      blogId,
      "This change the visiblity of this blog to private. Your blog won't be able view by other users.",
      "Make private",
      "red"
    );
  };

  const trashBlog = (blogId: string) => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color: "red" },
      children: <Text size="sm">This will move your blog to trash and you can recover blog from trash at any time.</Text>,
      labels: { confirm: "Move to trash", cancel: "Cancel" },
      onConfirm: async () => {
        const response = await blogActionHandler(deleteBlogApi, blogId);
        if (response) {
          dispatch(addBlogToAllBlogsProfile({ ...allBlogsData[blogId], trashed: true }));
        }
      },
    });
  };

  useEffect(() => {
    refetch();
    return () => {
      dispatch(resetProfileBlogs());
    };
  }, []);

  useEffect(() => {
    document.getElementsByTagName("html")[0].scrollTop = 0;
    dispatch(resetProfileBlogs());
    setPage(1);
    setAllBlogs();
  }, [sort]);

  const observer: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // console.log(entries);
        if (entries[0]?.isIntersecting) {
          (allBlogsMetaData?.totalPages ?? 2) > page && setPage((pre) => pre + 1);
        }
      });
      if (node) observer.current.observe(node);
      // console.log(node);
    },
    [isLoading, isFetching]
  );

  const handleSortChange = (e: any) => {
    const value = e; //
    if (value == "Oldest") setSort({ key: "date", order: 1 });
    if (value == "New") setSort({ key: "date", order: -1 });
    if (value == "Most liked") setSort({ key: "likes", order: -1 });
    if (value == "Least liked") setSort({ key: "likes", order: 1 });
    if (value == "Most views") setSort({ key: "views", order: -1 });
    if (value == "Least views") setSort({ key: "views", order: 1 });
    if (value == "Last updated") setSort({ key: "updated", order: -1 });
  };

  useEffect(() => {
    if (allBlogsMetaData.hasNextPage && isFetching) {
      nprogress.set(0);
      nprogress.start();
    } else nprogress.complete();
  }, [allBlogsMetaData, isFetching]);

  return (
    <div>
      <Paper pb={20}>
        <Flex align={"center"} justify={"space-between"} py={10}>
          <Select
            defaultValue={"Last updated"}
            w={"100%"}
            icon={
              sort?.key == "likes" || sort?.key == "views" ? (
                sort.order == -1 ? (
                  <IconSort90 />
                ) : (
                  <IconSort09 />
                )
              ) : sort.order == -1 ? (
                <IconSortAZ />
              ) : (
                <IconSortZA />
              )
            }
            placeholder="Select sort order"
            onChange={handleSortChange}
            data={["Oldest", "New", "Most liked", "Least liked", "Most views", "Least views", "Last updated"]}
          />
        </Flex>
      </Paper>
      <Flex direction={"column"} gap={15}>
        {Object.keys(allBlogsData).filter((key) => !allBlogsData[key]?.trashed).length == 0 && !isLoading && !isFetching && (
          <Text align="center" py={20}>
            Your blogs will appear here
          </Text>
        )}
        {Object.keys(allBlogsData)
          .filter((key) => !allBlogsData[key]?.trashed)
          .map((key: string, index, arr) => {
            const blog = allBlogsData[key];
            return (
              <Box key={blog?.blogId} ref={index == arr.length - 1 ? lastElementRef : undefined}>
                <Flex gap={10} justify={"space-between"}>
                  <Flex gap={10}>
                    <Link className="link" to={`/blog/${blog?.blogId}`}>
                      <Image withPlaceholder width={130} height={80} src={blog?.bannerImgURL} />
                    </Link>
                    <Box>
                      <Link className="link" to={`/blog/${blog?.blogId}`}>
                        <Text lineClamp={1} fw="500" fz="md">
                          {blog?.title}
                        </Text>
                      </Link>
                      <Text fz="sm" color="dimmed">
                        {formatter.format(blog?.views)} views . {dateFormatter.format(new Date())}
                      </Text>

                      <Flex align="center" gap={10}>
                        {!blog?.disabled && <> {blog?.published ? <IconWorld size={"15px"} /> : <IconLock size={"15px"} />}</>}
                        <IconThumbUp size={"20px"} /> <small> {formatter.format(blog?.reactions?.likes || 0)}</small>
                        <IconMessage size={"15px"} /> <small> {formatter.format(blog?.comments || 0)}</small>
                        {blog?.disabled && <Chip checked={false} children={<>Disabled</>} />}
                      </Flex>
                    </Box>
                  </Flex>
                  <Box>
                    <Menu>
                      <Menu.Target>
                        <ActionIcon>
                          <IconDotsVertical size={"20px"} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {blog?.published ? (
                          <Menu.Item icon={<IconLock size={14} />} onClick={() => makePrivate(blog?.blogId)}>
                            Make private
                          </Menu.Item>
                        ) : (
                          <Menu.Item icon={<IconWorld size={14} />} onClick={() => makePublic(blog?.blogId)}>
                            Make public
                          </Menu.Item>
                        )}
                        <Link to={`/blog/edit/${blog?.blogId}`} className="link">
                          <Menu.Item icon={<IconEdit size={14} />}>Edit Blog</Menu.Item>
                        </Link>
                        <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => trashBlog(blog?.blogId)}>
                          Trash blog
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        {(isLoading || isFetching) && (
          <Flex justify={"center"}>
            <Loader size={"sm"} />
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default BlogMbAllBlogsSubPage;
