import { ActionIcon, Badge, Box, Button, Card, Flex, Grid, Image, Loader, Menu, Text } from "@mantine/core";
import { IconActivity, IconTrash } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  useDeleteBlogWithBlogIdMutation,
  usePutPublishBlogMutation,
  usePutRecoverTrashedBlogMutation,
  usePutUnPublishBlogMutation,
} from "../../../../lib/api/blogApi";
import { useAppSelector } from "../../../../lib/redux/hooks";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const BlogCardWithSettingsComponent = ({
  blog,
  userId,
  span,
}: {
  blog: any;
  span?: number;
  userId: string | undefined;
}) => {
  const user = useAppSelector((state) => state.user.data);

  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();
  const [recoverFromTrashApi] = usePutRecoverTrashedBlogMutation();

  const [recoveringLoading, setRecoveringLoading] = useState(false);

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
      children: (
        <Text size="sm">This will move your blog to trash and you can recover blog from trash at any time.</Text>
      ),
      labels: { confirm: "Move to trash", cancel: "Don't move to trash" },
      onConfirm: () => {
        blogActionHandler(deleteBlogApi);
      },
    });
  };
  const recoverFromTrash = async () => blogActionHandler(recoverFromTrashApi);

  const blogActionHandler = async (apiCallFuntion: any) => {
    setRecoveringLoading(true);
    try {
      const response = await apiCallFuntion(blog?.blogId).unwrap();
      setRecoveringLoading(false);
    } catch (error: any) {
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
                {blog?.disabled ? "! Disabled" : blog?.deleted ? "Deleted" : blog?.published ? "public" : "private"}
              </Badge>
              {!blog?.deleted && (
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <IconDotsVertical size={"20px"} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Actions</Menu.Label>
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
                      Delete
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
          {!blog?.deleted && (
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
          {blog?.deleted && (
            <Button
              onClick={() => recoverFromTrash()}
              leftIcon={recoveringLoading ? <Loader size={"20px"} /> : <IconActivity size={"20px"} />}
              variant="default"
              fullWidth
            >
              Restore blog
            </Button>
          )}
        </div>
      </Box>
    </Grid.Col>
  );
};

export default BlogCardWithSettingsComponent;
