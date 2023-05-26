import { useEffect } from "react";
import {
  useGetAllTrashedBlogsQuery,
  usePermenentlyDeleteBlogMutation,
  usePutRecoverTrashedBlogMutation,
} from "../../../../lib/api/blogApi";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import { addBlogToTrashedBlogsProfile, setTrashedBlogsMetaDataProfile } from "../../../../lib/redux/profileSlice";
import { Box, Button, Flex, Image, Table, Text } from "@mantine/core";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

const ProfileTrashedBlogsComponent = () => {
  const { data: trashedBLogsData } = useGetAllTrashedBlogsQuery({ page: 1 });
  const trashedBlogs = useAppSelector((state) => state.profile.trashedBlogs);
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
      <NavigationProgress />
      <Table highlightOnHover verticalSpacing="xs">
        <thead>
          <tr>
            <th>Trashed blogs</th>
            <th>-</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(trashedBlogs)
            .filter((key) => !trashedBlogs[key]?.recovered)
            .map((key) => {
              const blog = trashedBlogs[key];
              return (
                <tr key={blog?.blogId}>
                  <td>
                    <Flex gap={20}>
                      <Box h={100}>
                        <Image src={blog?.bannerImgURL} width={150} height={100} />
                      </Box>
                      <Box miw={300}>
                        <Text lineClamp={2} fz={"md"}>
                          {blog?.title}
                        </Text>
                        <Text lineClamp={2} color="dimmed" fz={"sm"}>
                          {blog?.subtitle}
                        </Text>
                        <Flex p={10} gap={5} className="hoverable" sx={{ display: "none" }}></Flex>
                      </Box>
                    </Flex>
                  </td>
                  <td>
                    <Button variant="light" onClick={() => recoverFromTrash(blog?.blogId)}>
                      Restore blog
                    </Button>
                  </td>
                  <td>
                    <Button variant="default" onClick={() => permenentlyDeleteHandler(blog?.blogId)}>
                      Delete permanently
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProfileTrashedBlogsComponent;
