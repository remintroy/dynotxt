import { Avatar, Box, Card, Divider, Flex, Grid, Image, Skeleton, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useGetUserDataWithUidQuery } from "../../lib/api/authApi";

const BlogCardComponent = ({ blog, span }: { blog: any; span?: number }) => {
  const { data: userData, isLoading: isUserDataLoading } = useGetUserDataWithUidQuery(blog?.author, { skip: !blog });
  return (
    <Grid.Col span={span ?? 12}>
      <Box h={"100%"}>
        <Card.Section>
          <Grid>
            <Grid.Col span={8}>
              <Link className="link" to={`/blog/${blog.blogId}`}>
                <Box
                  sx={{
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
                    {blog?.title}
                  </Text>
                  <Text my={10} lineClamp={2}>
                    {blog?.subtitle}
                  </Text>
                </Box>
              </Link>
              {/* <Flex>#Private #Google #NodeJs</Flex> */}
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
                )}
              </Box>
            </Grid.Col>
            <Grid.Col span={4}>
              <Image
                radius={"xs"}
                caption={<Text>{new Date(blog?.createdAt).toDateString()}</Text>}
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

export default BlogCardComponent;
