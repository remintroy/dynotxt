import { Badge, Card, Flex, Grid, Image, Skeleton, Text } from "@mantine/core";

const BlogCardSkeltonComponent = () => {
  return (
    <Grid.Col span={4}>
      <Card h={"100%"} w="100%" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={""} withPlaceholder height={230} />
        </Card.Section>
        <div style={{ marginTop: 15 }}>
          <Flex justify={"space-between"}>
            <Badge color={"blue"}>Loading...</Badge>
          </Flex>
          <Text mt={10} size={"lg"} fw={"bold"} lineClamp={1}>
            <Skeleton w={"100%"} h={20} />
          </Text>
          <Text mt={10} lineClamp={2}>
            <Skeleton w={"70%"} h={10} />
          </Text>
          <div>
            <Skeleton w={"70%"} h={10} />
          </div>
          <br />
          <Skeleton w={"100%"} h={40} />
        </div>
      </Card>
    </Grid.Col>
  );
};

export default BlogCardSkeltonComponent;
