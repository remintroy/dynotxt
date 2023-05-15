import { Badge, Box, Card, Flex, Grid, Skeleton, Text } from "@mantine/core";

const BlogCardSkeltonComponent = () => {
  return (
    <Grid.Col span={4}>
      <Box h={"100%"} w="100%">
        <Card.Section>
          <Skeleton height={230} />
        </Card.Section>
        <div style={{ marginTop: 15 }}>
          <Flex justify={"space-between"}>
            <Badge color={"blue"}>Loading...</Badge>
          </Flex>
          <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
            <Skeleton w={"100%"} h={20} />
          </Text>
          <Text mt={10} lineClamp={2}>
            <Skeleton w={"80%"} h={10} />
          </Text>
          <div>
            <Skeleton mt={5} w={"70%"} h={10} />
          </div>
          <Skeleton mt={20} w={"100%"} h={40} />
        </div>
      </Box>
    </Grid.Col>
  );
};

export default BlogCardSkeltonComponent;
