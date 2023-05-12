import { ActionIcon, Badge, Button, Card, Flex, Grid, Image, Menu, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteBlogWithBlogIdMutation, usePutPublishBlogMutation, usePutUnPublishBlogMutation } from "../../../../lib/api/blogApi";
import { useAppSelector } from "../../../../lib/redux/hooks";


const BlogCardComponent = ({ blog, userId }: { blog: any; userId: string | undefined }) => {
  const user = useAppSelector((state) => state.user.data);

  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();

  const makePublic = async () => {
    try {
      const response = await makePublicApi(blog?.blogId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const makePrivate = async () => {
    try {
      const response = await makePrivateApi(blog?.blogId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    try {
      const response = await deleteBlogApi(blog?.blogId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid.Col span={4}>
      <Card h={"100%"} padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={blog?.bannerImgURL} withPlaceholder height={230} alt={`Image for ${blog?.title}`} />
        </Card.Section>
        <div style={{ marginTop: 15 }}>
          {user?.uid == userId && (
            <Flex justify={"space-between"}>
              <Badge color={blog?.published ? "blue" : "red"}>{blog?.published ? "public" : "private"}</Badge>
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
            </Flex>
          )}
          <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
            {blog?.title}
          </Text>
          <Text mt={10} lineClamp={2}>
            {blog?.subtitle}
          </Text>
          <p>{blog.description}</p>
          {user?.uid == userId && (
            <>
              <Link className="link" to={`/blog/edit/${blog?.blogId}`}>
                <Button fullWidth>Edit</Button>
              </Link>
            </>
          )}
          <Link className="link" to={`/blog/${blog?.blogId}`}>
            <Button fullWidth mt={10}>
              View
            </Button>
          </Link>
        </div>
      </Card>
    </Grid.Col>
  );
};

export default BlogCardComponent;
