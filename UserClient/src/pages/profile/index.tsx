import { ActionIcon, Avatar, Badge, Button, Card, Chip, Flex, Grid, Image, Menu, Tabs, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useGetUserDataWithUidQuery } from "../../lib/api/authApi";
import {
  useDeleteBlogWithBlogIdMutation,
  useGetBlogDataDisplayQuery,
  usePutPublishBlogMutation,
  usePutUnPublishBlogMutation,
} from "../../lib/api/blogApi";
import { IconDotsVertical, IconGlobe, IconLock, IconPhoto, IconTrash, IconWorld } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { useAppSelector } from "../../lib/redux/hooks";

const BlogCard = ({ blog, userId }: { blog: any; userId: string | undefined }) => {
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

const UserProfilePage = () => {
  const { id: userId } = useParams();
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isFetching: isUserDataFetching,
    isError: isUserDataError,
  } = useGetUserDataWithUidQuery(userId);

  const {
    data: blogData,
    isLoading: isBlogDataLoading,
    isFetching: isBlogDataFetching,
    isError: isBlogDataError,
  } = useGetBlogDataDisplayQuery(userId, { skip: !userData });

  const user = useAppSelector((state) => state.user.data);

  const AllBLogs = () => {
    return (
      <Grid>
        {blogData?.map((blog: any) => {
          return <BlogCard key={blog?.blogId} blog={blog} userId={userId} />;
        })}
        {(blogData?.length === 0 || !blogData) && <h3 style={{ padding: 10 }}>Looks like there is no blogs yet</h3>}
      </Grid>
    );
  };

  const PublicBlogs = () => {
    const blogsArray = blogData?.filter((blog: any) => blog?.published == true) ?? [];

    return (
      <Grid>
        {blogsArray.map((blog: any) => {
          return <BlogCard key={blog?.blogId} blog={blog} userId={userId} />;
        })}
        {(blogsArray?.length === 0 || !blogData) && <h3 style={{ padding: 10 }}>Ooh!. There is nothing public here</h3>}
      </Grid>
    );
  };

  const PrivateBlogs = () => {
    const blogsArray = blogData?.filter((blog: any) => blog?.published == false) ?? [];

    return (
      <Grid>
        {blogsArray.map((blog: any) => {
          return <BlogCard key={blog?.blogId} blog={blog} userId={userId} />;
        })}
        {(blogsArray?.length === 0 || !blogData) && (
          <h3 style={{ padding: 10 }}>Yay.. There is nothing private here</h3>
        )}
      </Grid>
    );
  };

  return (
    <div style={{ padding: "25px" }}>
      <div className="porfileCont">
        <Flex gap={"30px"} align={"center"} my={20}>
          <Avatar size={"xl"} radius={"xl"} src={userData?.photoURL} />
          <div>
            <Flex mb={10} align={"center"} gap={20}>
              <h1 style={{ margin: 0, padding: 0 }}>{userData?.name}</h1>
              {user?.uid != userId && <Button variant="outline">Follow</Button>}
            </Flex>
            <Flex gap={10}>
              <Chip checked={false}>{blogData?.length ?? 0} Blogs</Chip>
              <Chip checked={false}>{userData?.followers ?? 0} Followers</Chip>
              <Chip checked={false}>{userData?.following ?? 0} Following</Chip>
            </Flex>
          </div>
        </Flex>
      </div>

      <Tabs defaultValue="all-blogs">
        <Tabs.List>
          <Tabs.Tab value="all-blogs" icon={<IconPhoto size="20px" />}>
            All Blogs
          </Tabs.Tab>
          {user?.uid == userId && (
            <Tabs.Tab value="public" icon={<IconWorld size="20px" />}>
              Public
            </Tabs.Tab>
          )}
          {user?.uid == userId && (
            <Tabs.Tab value="private" icon={<IconLock size="20px" />}>
              Private
            </Tabs.Tab>
          )}
          {user?.uid == userId && (
            <Tabs.Tab value="settings" icon={<IconSettings size="20px" />}>
              Settings
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="all-blogs" pt="xs">
          <AllBLogs />
        </Tabs.Panel>

        <Tabs.Panel value="public" pt="xs">
          <PublicBlogs />
        </Tabs.Panel>

        <Tabs.Panel value="private" pt="xs">
          <PrivateBlogs />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
