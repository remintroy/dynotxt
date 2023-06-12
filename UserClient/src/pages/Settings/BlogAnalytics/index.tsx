import { Link, useParams } from "react-router-dom";
import { useGetBlogQuery, useGetBlogViewsCountByBlogIdAnalyticsQuery, useGetCommentsQuery } from "../../../lib/api/blogApi";
import { Box, Button, Card, Flex, Grid, Image, Skeleton, Tabs, Text, Transition, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { IconEdit, IconExternalLink, IconFileAnalytics, IconMessage } from "@tabler/icons-react";

const BlogAnalyticsSettingsPage = () => {
  const { id: blogId } = useParams();
  const { data: blogData, isLoading } = useGetBlogQuery({ blogId });
  const { colorScheme } = useMantineTheme();
  const { data: commentData } = useGetCommentsQuery(blogId);

  const { data: blogViewsData } = useGetBlogViewsCountByBlogIdAnalyticsQuery({ blogId });
  const viewsOfAllBlogsLables = blogViewsData?.map((data: any) => data.date);
  const viewsOfAllBlogs = blogViewsData?.map((data: any) => data.count);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(commentData, blogViewsData);

  return (
    <Transition mounted={mounted} transition="fade" duration={300} timingFunction="ease">
      {(styles) => (
        <Box p={20} style={styles}>
          <Box py={20}>
            <Text fz="xl" fw="bold">
              {isLoading ? <Skeleton w={"80%"} h={30} /> : blogData?.title}
            </Text>
            <Text mt={5}>{isLoading ? <Skeleton w={"60%"} h={30} /> : blogData?.subtitle}</Text>
          </Box>
          <Tabs defaultValue="overall">
            <Tabs.List>
              <Tabs.Tab value="overall" icon={<IconFileAnalytics size="1rem" />}>
                Overall
              </Tabs.Tab>
              <Tabs.Tab value="Comments" icon={<IconMessage size="1rem" />}>
                Comments
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overall" pt="xs">
              <Grid mt={10}>
                <Grid.Col span={4}>
                  <Card p={20} withBorder>
                    <Box>
                      <Image src={blogData?.bannerImgURL} />
                    </Box>
                    <Box py={10}>
                      <Flex direction="column" gap={10}>
                        <Text color="dimmed">{new Date(blogData?.createdAt).toDateString()}</Text>
                        <Flex justify={"space-between"}>
                          <Text>Views</Text>
                          <Text>{blogData?.views}</Text>
                        </Flex>
                        <Flex justify={"space-between"}>
                          <Text>Comments</Text>
                          <Text>{blogData?.comments}</Text>
                        </Flex>
                        <Flex gap={10} justify="stretch">
                          <Link to={`/blog/${blogId}`} style={{ width: "100%" }} className="link">
                            <Button fullWidth leftIcon={<IconExternalLink size={"20px"} />}>
                              Open blog
                            </Button>
                          </Link>
                          <Link to={`/blog/edit/${blogId}`} style={{ width: "100%" }} className="link">
                            <Button fullWidth leftIcon={<IconEdit size={"20px"} />}>
                              Edit blog
                            </Button>
                          </Link>
                        </Flex>
                      </Flex>
                    </Box>
                  </Card>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Card withBorder>
                    <Text fz={"md"} fw="bold">
                      Views in last 10 days
                    </Text>
                    <br />
                    <Box sx={{ height: "300px", width: "100%" }}>
                      <Line
                        data={{
                          labels: viewsOfAllBlogsLables,
                          datasets: [
                            {
                              label: "Views",
                              data: viewsOfAllBlogs,
                              borderWidth: 1,
                              backgroundColor: colorScheme == "dark" ? "yellow" : "blue",
                              borderColor: colorScheme == "dark" ? "yellow" : "blue",
                              tension: 0.3,
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            y: {
                              ticks: {
                                precision: 0,
                              },
                            },
                          },

                          backgroundColor: "red",
                          maintainAspectRatio: false,
                        }}
                      />
                    </Box>
                  </Card>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="Comments" pt="xs">
              {commentData && commentData?.length == 0 && <Text>No comments yet</Text>}
            </Tabs.Panel>
          </Tabs>
        </Box>
      )}
    </Transition>
  );
};

export default BlogAnalyticsSettingsPage;
