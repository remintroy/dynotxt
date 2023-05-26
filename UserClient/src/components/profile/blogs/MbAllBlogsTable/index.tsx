import { ActionIcon, Box, Chip, Flex, Image, Loader, Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { IconDotsVertical, IconMessage } from "@tabler/icons-react";
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
import { addBlogToAllBlogsProfile, setAllBlogsMetaDataProfile } from "../../../../lib/redux/profileSlice";
import { useEffect } from "react";
import usePathHook from "../../../../hooks/usePath";

const MBAllBLogsTableProfileComponent = () => {
  const path = usePathHook();
  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const dateFormatter = Intl.DateTimeFormat("us", { dateStyle: "short" });
  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();
  const dispatch = useAppDispatch();

  const { data: blogsData, isLoading, isFetching } = useGetBlogDataDisplayQuery({ uid: path[1], page: 1 });
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
        message:
          error?.data?.error ?? "There was an error diring updating blog visiblity. Consier trying agter sometime",
      });
      return false;
    }
  };

  const handleConfirmation = async (
    actionApi: any,
    blogId: string,
    message: string,
    button: string,
    color?: string
  ) => {
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
      children: (
        <Text size="sm">This will move your blog to trash and you can recover blog from trash at any time.</Text>
      ),
      labels: { confirm: "Move to trash", cancel: "Cancel" },
      onConfirm: async () => {
        const response = await blogActionHandler(deleteBlogApi, blogId);
        if (response) {
          dispatch(addBlogToAllBlogsProfile({ ...allBlogsData[blogId], trashed: true }));
        }
      },
    });
  };

  return (
    <div>
      <Flex direction={"column"} gap={15}>
        {Object.keys(allBlogsData)
          .filter((key) => !allBlogsData[key]?.trashed)
          .map((key: string) => {
            const blog = allBlogsData[key];
            return (
              <Box key={blog?.blogId}>
                <Flex gap={10} justify={"space-between"}>
                  <Flex gap={10}>
                    <Link className="link" to={`/blog/${blog?.blogId}`}>
                      <Image width={130} height={80} src={blog?.bannerImgURL} />
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
                        {!blog?.disabled && (
                          <> {blog?.published ? <IconWorld size={"15px"} /> : <IconLock size={"15px"} />}</>
                        )}
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

export default MBAllBLogsTableProfileComponent;
