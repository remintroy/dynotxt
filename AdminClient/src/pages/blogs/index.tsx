import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ManageBlogsDisabledBlogsComponent from "../../components/manageBlogs/disabledBlogs";
import ManageBlogsReportedBlogsComponent from "../../components/manageBlogs/reportedBlogs";

const ManageBlogsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const blogsManageComponents = [<ManageBlogsReportedBlogsComponent />, <ManageBlogsDisabledBlogsComponent />];

  return (
    <div className="ManageBlogsPage">
      <Box p={4}>
        <Typography variant="h3" component="h1">
          Manage blogs
        </Typography>
        <br />
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          aria-label="Manage blogs tab"
        >
          <Tab label="Reported blogs" />
          <Tab label="Disabled blogs" />
        </Tabs>
        <br />
        <Box>{blogsManageComponents[value]}</Box>
      </Box>
    </div>
  );
};

export default ManageBlogsPage;
