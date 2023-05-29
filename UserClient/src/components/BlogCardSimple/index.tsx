import { Box, Card, Divider, Grid, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const BlogCardComponent = ({ blog, span }: { blog: any; span?: number }) => {
  return (
    <Grid.Col span={span ?? 12}>
      {/* p="lg" radius="md" withBorder */}
      <Box h={"100%"}>
        <Card.Section>
          <Grid>
            <Grid.Col span={8}>
              <Link className="link" to={`/blog/${blog.blogId}`}>
                <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
                  {blog?.title}
                </Text>
                <Text my={10} lineClamp={2}>
                  {blog?.subtitle}
                </Text>{" "}
              </Link>
            </Grid.Col>
            <Grid.Col span={4}>
              <Image radius={"xs"} src={blog?.bannerImgURL} withPlaceholder height={150} alt={`Image for ${blog?.title}`} />
            </Grid.Col>
          </Grid>
        </Card.Section>
        <Divider mt={20} />
      </Box>
    </Grid.Col>
  );
};

export default BlogCardComponent;
