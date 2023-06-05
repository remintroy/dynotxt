import { useEffect, useState } from "react";
import useBlogSearchHook from "../../../hooks/useBlogSearch";
import { Box, Card, Flex, Input, Paper, Text, Transition } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconExternalLink, IconSearch } from "@tabler/icons-react";

const SearchTabPage = () => {
  const { query, setQuery, data, isLoading } = useBlogSearchHook();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Transition mounted={mounted} transition="fade" duration={300} timingFunction="ease">
      {(styles) => (
        <Box style={styles}>
          <Paper sx={{ position: "sticky", top: 60, zIndex: 20 }} withBorder>
            <Input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search here" />
          </Paper>
          <Flex direction={"column"} gap={5} mt={10}>
            {isLoading && <Card>Loading...</Card>}
            {data?.map((e: any) => {
              return (
                <Link to={`/blog/${e.blogId}`} key={e.blogId} className="link">
                  <Paper p={5}>
                    <Flex justify={"space-between"} gap={10}>
                      <Box w={20}>
                        <IconSearch size={"20px"} />
                      </Box>
                      <Flex w={"100%"}>
                        <Text lineClamp={1}>{e.title}</Text>
                      </Flex>
                      <Box w={20}>
                        <IconExternalLink size={"20px"} />
                      </Box>
                    </Flex>
                  </Paper>
                </Link>
              );
            })}
          </Flex>
        </Box>
      )}
    </Transition>
  );
};

export default SearchTabPage;
