import { Box, Grid, Loader } from "@mantine/core";
import { useGetBlogsForHomeQuery } from "../../lib/api/blogApi";
import BlogCardNormalComponent from "../../components/profile/blogs/blogCardNormal";

const HomePage = () => {
  const { data, isLoading, isFetching } = useGetBlogsForHomeQuery({});

  return (
    <div className="Home">
      <Box>
        <h1>Explore blogs and find interesting blogs</h1>
      </Box>

      {(isFetching || isLoading) && <Loader />}
      <Grid gutter={"lg"}>
        {data?.map((blog: any) => {
          return <BlogCardNormalComponent key={blog?.blogId} blog={blog} userId={blog?.author} />;
        })}
        {data?.length === 0 && <h3 style={{ padding: 10 }}>Yay.. There is nothing private here</h3>}
      </Grid>
    </div>
  );
};

export default HomePage;
