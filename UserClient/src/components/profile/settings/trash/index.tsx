import { Flex, Grid } from "@mantine/core";
import { useGetAllTrashedBlogsQuery } from "../../../../lib/api/blogApi";
import BlogCardComponent from "../../blogs/blogCardSettings";

const TrashedBlogsComponent = () => {
  const { data } = useGetAllTrashedBlogsQuery({});
  return (
    <div>
      <Grid gutter={"lg"}>
        {data?.map((blog: any) => {
          return <BlogCardComponent key={blog?.blogId} blog={blog} userId={blog?.author} />;
        })}
        {data?.length === 0 && (
          <Flex
            style={{ padding: 30 }}
            justify={"center"}
            align={"center"}
            direction={"column"}
            sx={{ position: "relative", width: "100%" }}
          >
            <h1>Your trash is empty</h1>
          </Flex>
        )}
      </Grid>
    </div>
  );
};

export default TrashedBlogsComponent;
