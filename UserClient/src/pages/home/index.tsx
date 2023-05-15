import { Grid, Loader } from "@mantine/core";
import { useGetBlogsForHomeQuery } from "../../lib/api/blogApi";
import BlogCardComponent from "../../components/profile/blogs/blogCard";

const HomePage = () => {
  const { data, isLoading, isFetching } = useGetBlogsForHomeQuery({});

  return (
    <div className="Home">
      {(isFetching||isLoading )&& <Loader/>}
      <Grid gutter={"lg"}>
        {data?.map((blog: any) => {
          return <BlogCardComponent key={blog?.blogId} blog={blog} userId={blog?.author} />;
        })}
        {data?.length === 0 && <h3 style={{ padding: 10 }}>Yay.. There is nothing private here</h3>}
      </Grid>
    </div>
  );
};

export default HomePage;
