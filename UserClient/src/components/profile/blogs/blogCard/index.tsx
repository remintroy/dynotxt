import { Box, Button, Card, Grid, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../lib/redux/hooks";

const BlogCardComponent = ({ blog, userId, span }: { blog: any; span?: number; userId: string | undefined }) => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <Grid.Col span={span ?? 4}>
      {/* p="lg" radius="md" withBorder */}
      <Box h={"100%"}>
        <Card.Section>
          <Image radius={"sm"} src={blog?.bannerImgURL} withPlaceholder height={230} alt={`Image for ${blog?.title}`} />
        </Card.Section>
        <div style={{ marginTop: 15 }}>
          <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
            {blog?.title}
          </Text>
          <Text mt={10} lineClamp={2}>
            {blog?.subtitle}
          </Text>
          <p>{blog.description}</p>

          <Link className="link" to={`/blog/${blog?.blogId}`}>
            <Button variant="default" fullWidth mt={10}>
              View Blog
            </Button>
          </Link>
        </div>
      </Box>
    </Grid.Col>
  );
};

export default BlogCardComponent;
