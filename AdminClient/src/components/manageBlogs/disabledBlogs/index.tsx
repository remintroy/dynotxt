import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { useGetAllDisabledBlogsQuery, usePutEnableBlogMutation } from "../../../lib/api/blogApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import { useTheme } from "@emotion/react";
import { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";

const ManageBlogsDisabledBlogsComponent = () => {
  const theme: any = useTheme();
  const { dark } = useContext(ThemeContext);
  const user = useAppSelector((state) => state.user.data);
  const { data } = useGetAllDisabledBlogsQuery({}, { skip: !user });

  const DisabledListComponet = ({ blog }: any) => {
    const [enableBlogsApi] = usePutEnableBlogMutation();
    const [enableBlogLoading, setEnableBlogLoading] = useState(false);

    const handleEnableBlogs = async (blogId: any) => {
      try {
        setEnableBlogLoading(true);
        await enableBlogsApi(blogId);
        setEnableBlogLoading(false);
      } catch (error) {
        setEnableBlogLoading(false);
      }
    };

    return (
      <Card
        elevation={1}
        sx={{ p: 3, border: `1px solid ${dark ? theme.palette.primary.dark : theme.palette.primary.light}` }}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography>{blog.title}</Typography>
            <Typography mt={1} color={"dimgray"}>
              {blog.subtitle}
            </Typography>
            <Typography mt={1}>Reasons</Typography>
            {blog?.flags?.map((flag: any, index: any) => {
              return (
                <Typography color={"dimgray"} key={index}>
                  {new Date(flag?.createdAt).toDateString()} : {flag.reason}
                </Typography>
              );
            })}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={enableBlogLoading ? <CircularProgress size={"20px"} /> : ""}
                onClick={() => handleEnableBlogs(blog?.blogId)}
              >
                Enable Blog
              </Button>
            </Box>
          </Box>
          <Box>
            <img width={200} height={150} style={{ objectFit: "scale-down" }} src={blog?.bannerImgURL} />
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {data?.map((blog: any) => {
          return <DisabledListComponet blog={blog} key={blog.blogId} />;
        })}
      </Box>
    </>
  );
};

export default ManageBlogsDisabledBlogsComponent;
