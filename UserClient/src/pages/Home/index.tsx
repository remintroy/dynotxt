import { Box, Button, Container, Divider, Flex, Grid, Loader, Text, Transition } from "@mantine/core";
import { useGetBlogsForHomeQuery } from "../../lib/api/blogApi";
import BlogCardComponent from "../../components/BlogCardSimple";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [docs, setDocs] = useState<any>([]);
  const { data, isLoading, isFetching } = useGetBlogsForHomeQuery({ page });

  useEffect(() => {
    if (data) {
      setDocs((pre: any) => [...pre, ...data?.docs]);
    }
  }, [data]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Transition mounted={mounted} transition="fade" duration={300} timingFunction="ease">
      {(styles) => (
        <Container p={0} style={styles}>
          <Box p={10}>
            <Text fz={"xl"} fw={"bold"} py={20}>
              Welcome back to dynotxt
            </Text>
            <Divider py={10} />
            {isLoading && <Loader />}
            <Grid gutter={"lg"}>
              {docs?.map((blog: any) => {
                return <BlogCardComponent key={blog?.blogId} blog={blog} />;
              })}
              {data?.totalDocs === 0 && <h3 style={{ padding: 10 }}>Oops there is noting to show !</h3>}
            </Grid>
            <Flex justify={"center"} my={20}>
              {data?.hasNextPage && !isLoading && (
                <Button variant="default" leftIcon={isLoading || isFetching ? <Loader size={"sm"} /> : ""} onClick={() => setPage(data?.page + 1)}>
                  Show more
                </Button>
              )}
            </Flex>
          </Box>
        </Container>
      )}
    </Transition>
  );
};

export default HomePage;
