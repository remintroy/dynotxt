import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Image,
  Kbd,
  Menu,
  Skeleton,
  Text,
} from "@mantine/core";
import { IconActivity, IconEdit, IconTrash } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  useDeleteBlogWithBlogIdMutation,
  usePermenentlyDeleteBlogMutation,
  usePutPublishBlogMutation,
  usePutRecoverTrashedBlogMutation,
  usePutUnPublishBlogMutation,
} from "../../../../lib/api/blogApi";
import { useAppSelector } from "../../../../lib/redux/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useGetUserDataWithUidQuery } from "../../../../lib/api/authApi";
import { nprogress } from "@mantine/nprogress";

const BlogCardWithSettingsComponent = ({
  blog,
  userId,
  span,
}: {
  blog: any;
  span?: number;
  userId: string | undefined;
}) => {
  const { data: userData, isLoading: isUserDataLoading } = useGetUserDataWithUidQuery(userId, { skip: !userId });
  const user = useAppSelector((state) => state.user.data);

  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();
  const [recoverFromTrashApi] = usePutRecoverTrashedBlogMutation();
  const [permenentlyDeleteApi] = usePermenentlyDeleteBlogMutation();

  const blogActionHandler = async (apiCallFuntion: any) => {
    try {
      nprogress.set(0);
      nprogress.start();
      // calling currsponding api
      await apiCallFuntion(blog?.blogId).unwrap();
      nprogress.complete();
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

  const handleConfirmation = async (actionApi: any, message: string, button: string, color?: string) => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color },
      children: <Text size="sm">{message}</Text>,
      labels: { confirm: button, cancel: "Cancel" },
      onConfirm: () => {
        blogActionHandler(actionApi);
      },
    });
  };

  const makePublic = () => {
    handleConfirmation(
      makePublicApi,
      "This change the visiblity of this blog to pubic. Your will be shared and listed in searchs and can be seen by anyone.",
      "Make public"
    );
  };

  const makePrivate = () => {
    handleConfirmation(
      makePrivateApi,
      "This change the visiblity of this blog to private. Your blog won't be able view by other users.",
      "Make private",
      "red"
    );
  };

  const trashBlog = () => {
    handleConfirmation(
      deleteBlogApi,
      "This will move your blog to trash and you can recover blog from trash at any time.",
      "Move to trash",
      "red"
    );
  };

  const permenentlyDeleteHandler = () => {
    handleConfirmation(permenentlyDeleteApi, "This will permanently delete blog.", "Permenently Delete", "red");
  };

  const recoverFromTrash = async () => {
    blogActionHandler(recoverFromTrashApi);
  };

  return (
    <Grid.Col span={span ?? 12}>
      {/* p="lg" radius="md" withBorder */}
      <Box h={"100%"}>
        <Card.Section>
          <Grid>
            <Grid.Col span={9}>
              {!blog?.trashed && (
                <Link className="link" to={`/blog/${blog.blogId}`}>
                  <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
                    {blog?.title}
                  </Text>
                  <Text my={10} lineClamp={2}>
                    {blog?.subtitle}
                  </Text>
                </Link>
              )}
              {blog?.trashed && (
                <>
                  <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
                    {blog?.title}
                  </Text>
                  <Text my={10} lineClamp={2}>
                    {blog?.subtitle}
                  </Text>
                </>
              )}
              <Box sx={{ marginTop: 20 }}>
                {isUserDataLoading && (
                  <Flex gap={15} align={"center"}>
                    <Skeleton width={45} radius={"xl"} height={45} />
                    <Box>
                      <Skeleton width={150} height={15} />
                      <Skeleton width={70} mt={5} height={15} />
                    </Box>
                  </Flex>
                )}
                {blog?.trashed && (
                  <Flex gap={10}>
                    <Button
                      onClick={() => recoverFromTrash()}
                      leftIcon={<IconActivity size={"20px"} />}
                      variant="default"
                      fullWidth
                    >
                      Restore blog
                    </Button>
                    <Button
                      onClick={permenentlyDeleteHandler}
                      leftIcon={<IconTrash size={"20px"} />}
                      variant="default"
                      fullWidth
                    >
                      Delete Permently
                    </Button>
                  </Flex>
                )}
                {!blog?.trashed && !isUserDataLoading && (
                  <Flex justify={"space-between"}>
                    <Link className="link" to={`/profile/${userData?.uid}`}>
                      <Flex gap={15} align={"center"}>
                        <Avatar src={userData?.photoURL} radius={"xl"} />
                        <Box>
                          <Text sx={{ lineHeight: 1 }}>{userData?.name}</Text>
                          <Text fz={"sm"} color="dimmed">
                            {userData?.following} Followers
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
                    {user?.uid == userId && (
                      <Flex align={"center"} gap={20}>
                        <Flex align="center">
                          {blog?.published ? (
                            <Kbd sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <IconWorld size={14} />
                              Public
                            </Kbd>
                          ) : (
                            <Kbd sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <IconLock size={14} />
                              Private
                            </Kbd>
                          )}
                        </Flex>
                        <Menu>
                          <Menu.Target>
                            <ActionIcon>
                              <IconDotsVertical size={"20px"} />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Label>Actions</Menu.Label>
                            <Link className="link" to={`/blog/edit/${blog?.blogId}`}>
                              <Menu.Item icon={<IconEdit size={14} />}>Edit blog</Menu.Item>
                            </Link>
                            {!blog?.published && (
                              <Menu.Item onClick={() => makePublic()} icon={<IconWorld size={14} />}>
                                Make Public
                              </Menu.Item>
                            )}
                            {blog?.published && (
                              <Menu.Item onClick={() => makePrivate()} icon={<IconLock size={14} />}>
                                Make Private
                              </Menu.Item>
                            )}
                            <Menu.Item onClick={() => trashBlog()} color="red" icon={<IconTrash size={14} />}>
                              Move to trash
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Flex>
                    )}
                  </Flex>
                )}
              </Box>
            </Grid.Col>
            <Grid.Col span={3}>
              <Image
                radius={"sm"}
                src={blog?.bannerImgURL}
                withPlaceholder
                height={150}
                alt={`Image for ${blog?.title}`}
              />
            </Grid.Col>
          </Grid>
        </Card.Section>
        <Divider mt={20} />
      </Box>
    </Grid.Col>
  );
};

export default BlogCardWithSettingsComponent;
