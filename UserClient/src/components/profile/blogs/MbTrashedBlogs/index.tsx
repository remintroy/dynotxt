import { useEffect } from "react";
import {
  useGetAllTrashedBlogsQuery,
  usePermenentlyDeleteBlogMutation,
  usePutRecoverTrashedBlogMutation,
} from "../../../../lib/api/blogApi";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import { addBlogToTrashedBlogsProfile, setTrashedBlogsMetaDataProfile } from "../../../../lib/redux/profileSlice";
import { nprogress } from "@mantine/nprogress";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { ActionIcon, Box, Chip, Flex, Image, Loader, Menu, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconRecycle } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";

const MbTrashedBLogsProfileComponent = () => {
  const { data: trashedBLogsData, isLoading, isFetching } = useGetAllTrashedBlogsQuery({ page: 1 });
  const trashedBlogs = useAppSelector((state) => state.profile.trashedBlogs);
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const dateFormatter = Intl.DateTimeFormat("us", { dateStyle: "short" });
  const dispatch = useAppDispatch();
  const [recoverFromTrashApi] = usePutRecoverTrashedBlogMutation();
  const [permenentlyDeleteApi] = usePermenentlyDeleteBlogMutation();

  useEffect(() => {
    // assignig AllBlogs data to redux
    if (trashedBLogsData) {
      trashedBLogsData?.docs?.forEach((blog: any) => {
        dispatch(addBlogToTrashedBlogsProfile(blog));
      });
      let allBlogsMetaData: any = JSON.stringify(trashedBLogsData);
      allBlogsMetaData = JSON.parse(allBlogsMetaData);
      allBlogsMetaData.docs = null;
      dispatch(setTrashedBlogsMetaDataProfile(allBlogsMetaData));
    }
  }, [trashedBLogsData]);

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
    }
  };

  const permenentlyDeleteHandler = async (blogId: string) => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color: "red" },
      children: <Text size="sm">This will permanently delete blog.</Text>,
      labels: { confirm: "Permenently Delete", cancel: "Cancel" },
      onConfirm: async () => {
        await blogActionHandler(permenentlyDeleteApi, blogId);
        dispatch(addBlogToTrashedBlogsProfile({ ...trashedBlogs[blogId], recovered: true }));
      },
    });
  };

  const recoverFromTrash = async (blogId: string) => {
    await blogActionHandler(recoverFromTrashApi, blogId);
    dispatch(addBlogToTrashedBlogsProfile({ ...trashedBlogs[blogId], recovered: true }));
  };
  return (
    <div>
      <Flex direction={"column"} gap={15}>
        {Object.keys(trashedBlogs).filter((key) => !trashedBlogs[key]?.recovered).length == 0 &&
          !isLoading &&
          !isFetching && (
            <Text align="center" py={20}>
              Your blogs will appear here
            </Text>
          )}
        {Object.keys(trashedBlogs)
          .filter((key) => !trashedBlogs[key]?.recovered)
          .map((key: string) => {
            const blog = trashedBlogs[key];
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
                        createdAt : {dateFormatter.format(new Date())}
                      </Text>

                      <Flex align="center" gap={10}>
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
                        <Menu.Item icon={<IconRecycle size={14} />} onClick={() => recoverFromTrash(blog?.blogId)}>
                          Restore blog
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          icon={<IconTrash size={14} />}
                          onClick={() => permenentlyDeleteHandler(blog?.blogId)}
                        >
                          Delete permanently
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

export default MbTrashedBLogsProfileComponent;
