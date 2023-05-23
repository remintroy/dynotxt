import { Avatar, Box, Card, Chip, Flex, Grid, Loader, Paper, Text } from "@mantine/core";
import { useGetBlogsForHomeQuery } from "../../lib/api/blogApi";
import BlogCardNormalComponent from "../../components/profile/blogs/blogCardNormal";
import { useAppSelector } from "../../lib/redux/hooks";

const HomePage = () => {
  const { data, isLoading, isFetching } = useGetBlogsForHomeQuery({});
  const user = useAppSelector((state) => state.user.data);
  return (
    <div className="Home">
      <Box>
        <h1>Explore blogs and find interesting blogs</h1>
      </Box>
      <br />
      {(isFetching || isLoading) && <Loader />}
      <Grid>
        <Grid.Col span={8}>
          <Grid gutter={"lg"}>
            {data?.map((blog: any) => {
              return <BlogCardNormalComponent key={blog?.blogId} blog={blog} userId={blog?.author} />;
            })}
            {data?.length === 0 && <h3 style={{ padding: 10 }}>Yay.. There is nothing private here</h3>}
          </Grid>
        </Grid.Col>
        <Grid.Col span={4} h="inherit">
          <Box sx={{ position: "sticky", top: 100 }} w="100%">
            <Paper withBorder p={25}>
              <Text fz={"lg"} fw={"bold"}>
                Filter your feed
              </Text>
              <Flex wrap="wrap" gap={8} mt={10}>
                <Chip display="inline">JS</Chip>
                <Chip display="inline">Cycling</Chip>
                <Chip display="inline">Brooslee</Chip>
                <Chip display="inline">Kunfu</Chip>
                <Chip display="inline">Karate</Chip>
                <Chip display="inline">Hacking</Chip>
                <Chip display="inline">Locking</Chip>
                <Chip display="inline">Servers</Chip>
                <Chip display="inline">Mongodb</Chip>
                <Chip display="inline">New Js features</Chip>
                <Chip display="inline">ReactJS</Chip>
                <Chip display="inline">Native coding</Chip>
                <Chip display="inline">Creative thinging</Chip>
                <Chip display="inline">Mapping</Chip>
                <Chip display="inline">Machine learning</Chip>
                <Chip display="inline">Ai</Chip>
                <Chip display="inline">Robots</Chip>
                <Chip display="inline">MakerAi</Chip>
                <Chip display="inline">API</Chip>
                <Chip display="inline">Socket</Chip>
                <Chip display="inline">Express</Chip>
                <Chip display="inline">Loops in sequrity</Chip>
                <Chip display="inline">GoPro</Chip>
                <Chip display="inline">MacBook</Chip>
                <Chip display="inline">GTR</Chip>
              </Flex>
            </Paper>
            <Paper mt={10} withBorder p={25}>
              Your favorates list
            </Paper>
            <Paper mt={10} withBorder p={25}>
              <Text fz={"lg"} fw={"bold"}>
                Reach your Followers blogs
              </Text>
              <Flex align="center" mt={10} gap={10}>
                <Avatar radius={"xl"} src={user?.photoURL} />
                <Text>Dude blogs</Text>
              </Flex>
              <Flex align="center" mt={10} gap={10}>
                <Avatar radius={"xl"} src={user?.photoURL} />
                <Text>Master shifu</Text>
              </Flex>
              <Flex align="center" mt={10} gap={10}>
                <Avatar radius={"xl"} src={user?.photoURL} />
                <Text>Thankan chettan</Text>
              </Flex>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default HomePage;
