import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Image,
  Kbd,
  Loader,
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
import { useState } from "react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useGetUserDataWithUidQuery } from "../../../../lib/api/authApi";

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

  const [recoveringLoading, setRecoveringLoading] = useState(false);
  const [deletePermanentLoading, setDeletePermanentLoading] = useState(false);

  const blogActionHandler = async (apiCallFuntion: any) => {
    try {
      const response = await apiCallFuntion(blog?.blogId).unwrap();
      setRecoveringLoading(false);
      setDeletePermanentLoading(false);
    } catch (error: any) {
      setDeletePermanentLoading(false);
      setRecoveringLoading(false);
      notifications.show({
        color: "red",
        title: "Oops something went wrong",
        message: error?.data?.error
          ? error?.data?.error
          : "There was an error diring updating blog visiblity. Consier trying agter sometime",
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

  return (
    <Grid.Col span={span ?? 6}>
      {/* p="lg" radius="md" withBorder */}
      <Box h={"100%"}>
        <Card.Section>
          <Grid>
            <Grid.Col span={9}>
              <Link className="link" to={`/blog/${blog.blogId}`}>
                <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
                  {blog?.title}
                </Text>
                <Text my={10} lineClamp={2}>
                  {blog?.subtitle}
                </Text>{" "}
              </Link>
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

                {!isUserDataLoading && (
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
                              public
                            </Kbd>
                          ) : (
                            <Kbd sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <IconLock size={14} />
                              private
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

const dun = ({ blog, userId, span }: { blog: any; span?: number; userId: string | undefined }) => {
  const user = useAppSelector((state) => state.user.data);

  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();
  const [recoverFromTrashApi] = usePutRecoverTrashedBlogMutation();
  const [permenentlyDeleteApi] = usePermenentlyDeleteBlogMutation();

  const [recoveringLoading, setRecoveringLoading] = useState(false);
  const [deletePermanentLoading, setDeletePermanentLoading] = useState(false);

  const makePublic = async () => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      children: (
        <Text size="sm">
          This change the visiblity of this blog to pubic. Your will be shared and listed in searchs and can be seen by
          anyone
        </Text>
      ),
      labels: { confirm: "Make  Public", cancel: "Cancel" },
      onConfirm: () => {
        blogActionHandler(makePublicApi);
      },
    });
  };

  const makePrivate = async () => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      children: (
        <Text size="sm">
          This change the visiblity of this blog to private. Your blog won't be able view by other users
        </Text>
      ),
      labels: { confirm: "Make  Private", cancel: "Cancel" },
      onConfirm: () => {
        blogActionHandler(makePrivateApi);
      },
    });
  };
  const deleteBlog = async () => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color: "red" },
      children: <Text size="sm">.</Text>,
      labels: { confirm: "Move to trash", cancel: "Don't move to trash" },
      onConfirm: () => {
        blogActionHandler(deleteBlogApi);
      },
    });
  };

  const recoverFromTrash = async () => {
    setRecoveringLoading(true);
    blogActionHandler(recoverFromTrashApi);
  };

  const permenentlyDeleteHandler = async () => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color: "red" },
      children: <Text size="sm">This will permanently delete blog. </Text>,
      labels: { confirm: "Delete permanently", cancel: "Don't delete" },
      onConfirm: () => {
        setDeletePermanentLoading(true);
        blogActionHandler(permenentlyDeleteApi);
      },
    });
  };

  const blogActionHandler = async (apiCallFuntion: any) => {
    try {
      const response = await apiCallFuntion(blog?.blogId).unwrap();
      setRecoveringLoading(false);
      setDeletePermanentLoading(false);
    } catch (error: any) {
      setDeletePermanentLoading(false);
      setRecoveringLoading(false);
      notifications.show({
        color: "red",
        title: "Oops something went wrong",
        message: error?.data?.error
          ? error?.data?.error
          : "There was an error diring updating blog visiblity. Consier trying agter sometime",
      });
    }
  };

  return (
    <Grid.Col span={span ?? 4}>
      {/* p="lg" radius="md" withBorder */}
      <Box h={"100%"}>
        <Card.Section>
          <Image radius={"sm"} src={blog?.bannerImgURL} withPlaceholder height={230} alt={`Image for ${blog?.title}`} />
        </Card.Section>
        <div style={{ marginTop: 15 }}>
          {user?.uid == userId && (
            <Flex justify={"space-between"}>
              <Badge color={blog?.published && !blog?.deleted && !blog?.disabled ? "blue" : "red"}>
                {blog?.disabled ? "! Disabled" : blog?.deleted ? "Deleted" : blog?.published ? "public" : "private"}{" "}
              </Badge>
              {!blog?.deleted && (
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <IconDotsVertical size={"20px"} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconEdit size={14} />}>Edit Blog</Menu.Item>
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
                    <Menu.Item onClick={() => deleteBlog()} color="red" icon={<IconTrash size={14} />}>
                      Move to trash
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Flex>
          )}
          <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
            {blog?.title}
          </Text>
          <Text mt={10} lineClamp={2}>
            {blog?.subtitle}
          </Text>
          <p>{blog.description}</p>
          {!blog?.trashed && (
            <>
              {user?.uid == userId && (
                <Grid align="center">
                  <Grid.Col span={6}>
                    <Link className="link" to={`/blog/edit/${blog?.blogId}`}>
                      <Button variant="default" fullWidth>
                        Edit Blog
                      </Button>
                    </Link>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Link className="link" to={`/blog/${blog?.blogId}`}>
                      <Button variant="default" fullWidth>
                        View Blog
                      </Button>
                    </Link>
                  </Grid.Col>
                </Grid>
              )}
              {user?.uid != userId && (
                <Link className="link" to={`/blog/${blog?.blogId}`}>
                  <Button variant="default" fullWidth mt={10}>
                    View Blog
                  </Button>
                </Link>
              )}
            </>
          )}
          {blog?.trashed && (
            <Flex gap={10}>
              <Button
                onClick={() => recoverFromTrash()}
                leftIcon={recoveringLoading ? <Loader size={"20px"} /> : <IconActivity size={"20px"} />}
                variant="default"
                fullWidth
              >
                Restore blog
              </Button>
              <Button
                onClick={permenentlyDeleteHandler}
                leftIcon={recoveringLoading ? <Loader size={"20px"} /> : <IconTrash size={"20px"} />}
                variant="default"
                fullWidth
              >
                Delete Permently
              </Button>
            </Flex>
          )}
        </div>
      </Box>
    </Grid.Col>
  );
};

export default BlogCardWithSettingsComponent;
