import { ActionIcon, Box, Flex, Image, Loader, Menu, Progress, ScrollArea, Table, Text, Tooltip } from "@mantine/core";
import { IconChevronDown, IconPencil, IconReportAnalytics } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { addBlogToAllBlogsProfile, resetProfileBlogs, setAllBlogsMetaDataProfile } from "../../../../lib/redux/slices/profile";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import {
  useDeleteBlogWithBlogIdMutation,
  useGetBlogDataDisplayQuery,
  usePutPublishBlogMutation,
  usePutUnPublishBlogMutation,
} from "../../../../lib/api/blogApi";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useRef, useState } from "react";
import usePathHook from "../../../../hooks/usePath";

const ProfilePcAllBlogsTableSubPage = () => {
  const path = usePathHook();
  const [page, setPage] = useState(1);
  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);
  const allBlogsMetaData = useAppSelector((state) => state.profile.allBlogsMetaData);
  const dispatch = useAppDispatch();
  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const { data: blogsData, isLoading, isFetching } = useGetBlogDataDisplayQuery({ uid: path[1], page: page });
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
    return () => {
      dispatch(resetProfileBlogs());
    };
  }, []);

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

  return (
    <>
      <ScrollArea>
        <Table highlightOnHover verticalSpacing="xs">
          <thead>
            <tr>
              <th>Blog</th>
              <th>Visiblity</th>
              <th>views</th>
              <th>comments</th>
              <th>Restrictions</th>
              <th>Date</th>
              <th>Likes & dislikes</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(allBlogsData)
              .filter((key) => !allBlogsData[key]?.trashed)
              .map((key: string, index, arr) => {
                const blog = allBlogsData[key];
                const totalViews = Number((blog?.reactions?.likes || 0) + (blog?.reactions?.dislikes || 0));
                const likePercent = ~~((blog?.reactions?.likes / totalViews) * 100);
                return (
                  <tr key={blog?.blogId} ref={index == arr.length - 1 ? lastElementRef : undefined}>
                    <td>
                      <Box
                        sx={{
                          ":hover": {
                            ".hoverable": {
                              display: "flex",
                            },
                          },
                        }}
                      >
                        <Flex gap={20}>
                          <Box h={100}>
                            <Image src={blog?.bannerImgURL} width={150} height={100} />
                          </Box>
                          <Box maw={500} miw={300}>
                            <Text lineClamp={blog?.subtitle ? 1 : 2} fz={"md"}>
                              {blog?.title}
                            </Text>
                            <Text lineClamp={1} color="dimmed" fz={"sm"}>
                              {blog?.subtitle}
                            </Text>
                            <Flex p={10} gap={5} className="hoverable" sx={{ display: "none" }}>
                              <Tooltip withArrow label="Edit your blog">
                                <Link to={`/blog/edit/${blog?.blogId}`}>
                                  <ActionIcon>
                                    <IconPencil size={"20px"} />
                                  </ActionIcon>
                                </Link>
                              </Tooltip>
                              <Tooltip label="Open your blog" withArrow>
                                <Link to={`/blog/${blog?.blogId}`}>
                                  <ActionIcon>
                                    <IconExternalLink size={"20px"} />
                                  </ActionIcon>
                                </Link>
                              </Tooltip>
                              <Tooltip label="Move to trash" withArrow>
                                <ActionIcon onClick={() => trashBlog(blog?.blogId)}>
                                  <IconTrash size={"20px"} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Blog analytics" withArrow>
                                <Link to={`/blog/analytics/${blog?.blogId}`}>
                                  <ActionIcon>
                                    <IconReportAnalytics size={"20px"} />
                                  </ActionIcon>
                                </Link>
                              </Tooltip>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </td>
                    <td>
                      {blog?.disabled ? (
                        "-"
                      ) : blog?.published ? (
                        <Menu>
                          <Menu.Target>
                            <Tooltip withArrow label="You blog is currently public click to change">
                              <Flex sx={{ cursor: "pointer" }} align={"center"} gap={5}>
                                <IconWorld size={"20px"} />
                                Public
                                <ActionIcon>
                                  <IconChevronDown size={"15px"} />
                                </ActionIcon>
                              </Flex>
                            </Tooltip>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item icon={<IconLock size={14} />} onClick={() => makePrivate(blog?.blogId)}>
                              Make private
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      ) : (
                        <Menu>
                          <Menu.Target>
                            <Tooltip withArrow label="You blog is currently private click to change">
                              <Flex sx={{ cursor: "pointer" }} align={"center"} gap={5}>
                                <IconLock size={"20px"} />
                                Private
                                <IconChevronDown size={"15px"} />
                              </Flex>
                            </Tooltip>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item icon={<IconWorld size={14} />} onClick={() => makePublic(blog?.blogId)}>
                              Make public
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      )}
                    </td>
                    <td>
                      <Tooltip label={`${blog?.views} views`}>
                        <Text>{formatter.format(blog?.views)} </Text>
                      </Tooltip>
                    </td>
                    <td>{formatter.format(blog?.comments)}</td>
                    <td>
                      {blog?.disabled ? (
                        <>
                          <Tooltip withArrow label="We have found something inappropriate in you blog">
                            <Text>Disabled</Text>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip withArrow label="Your blog has no restrictions">
                            <Text>None</Text>
                          </Tooltip>
                        </>
                      )}
                    </td>
                    <td>
                      <Tooltip withArrow label="Date which your blog was created">
                        <Box>
                          <Text>{new Date(blog?.createdAt).toDateString()}</Text>
                          <Text color="dimmed">created</Text>
                        </Box>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        withArrow
                        label={`Your blog has ${formatter.format(blog?.reactions?.likes)} likes and ${formatter.format(blog?.reactions?.dislikes)} dislikes`}
                      >
                        <Box>
                          <Text align="end">{likePercent}%</Text>
                          <Text color="dimmed" align="end">
                            {formatter.format(blog?.reactions?.likes)} Likes
                          </Text>
                          <Progress value={likePercent} mt={10} />
                        </Box>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ScrollArea>
      {allBlogsMetaData.hasNextPage && isFetching && (
        <Flex justify={"center"} py={20}>
          <Loader />
        </Flex>
      )}
    </>
  );
};

export default ProfilePcAllBlogsTableSubPage;
