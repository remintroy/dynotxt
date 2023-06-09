import { Box, Chip, Container, Flex, Grid, Loader, ScrollArea, Transition } from "@mantine/core";
import { useGetBlogsForHomeQuery, useGetSearchBlogCategoryMutation } from "../../lib/api/blogApi";
import BlogCardComponent from "../../components/BlogCardSimple";
import { useCallback, useEffect, useRef, useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [docs, setDocs] = useState<any>([]);
  const [categorys, setCategorys] = useState<any>({});
  const [searchApi] = useGetSearchBlogCategoryMutation();
  const [selectedCategorys, setSelectedCategory] = useState<string[]>([]);
  const { data, isLoading, isFetching, refetch } = useGetBlogsForHomeQuery({ page, category: selectedCategorys });

  useEffect(() => {
    if (data) {
      page == 1 ? setDocs([...data?.docs]) : setDocs((pre: any) => [...pre, ...data?.docs]);
    }
  }, [data]);

  const observer: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // console.log(entries);
        if (entries[0]?.isIntersecting) {
          (data?.totalPages ?? 2) > page && setPage((pre) => pre + 1);
        }
      });
      if (node) observer.current.observe(node);
      // console.log(node);
    },
    [isLoading, isFetching]
  );

  useEffect(() => {
    setPage(1);
    refetch();
  }, [selectedCategorys]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    (async () => {
      const result: any = await searchApi({});
      setCategorys(result?.data);
    })();
    setMounted(true);
  }, []);
  return (
    <Transition mounted={mounted} transition="fade" duration={300} timingFunction="ease">
      {(styles) => (
        <Container p={0} style={styles}>
          <ScrollArea py={10} scrollbarSize={0} w={"100%"} offsetScrollbars>
            <Flex gap={10}>
              {categorys?.docs?.map((tag: string) => {
                return (
                  <Chip
                    sx={{ textTransform: "capitalize" }}
                    key={tag}
                    onChange={(selected) =>
                      setSelectedCategory((pre) => {
                        if (!selected) return pre.filter((a) => a !== tag);
                        return [...pre, tag];
                      })
                    }
                  >
                    {tag}
                  </Chip>
                );
              })}
            </Flex>
          </ScrollArea>
          <Box p={10}>
            {isLoading && <Loader />}
            <Grid gutter={"lg"}>
              {docs?.map((blog: any, index: number) => {
                return <BlogCardComponent ref={index == docs?.length - 1 ? lastElementRef : undefined} key={blog?.blogId} blog={blog} />;
              })}
              {data?.totalDocs === 0 && <h3 style={{ padding: 10 }}>Oops there is noting to show !</h3>}
            </Grid>
            <Flex justify={"center"} my={20}>
              {data?.hasNextPage && !isLoading && (
                <Flex justify={"center"} py={20}>
                  <Loader />
                </Flex>
              )}
            </Flex>
          </Box>
        </Container>
      )}
    </Transition>
  );
};

export default HomePage;
