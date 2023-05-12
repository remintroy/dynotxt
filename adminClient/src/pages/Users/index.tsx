import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useState } from "react";
import ManageUsersAllUsersComponent from "../../components/ManageUser/AllUsers";
import ManageUsersBlockedUsersComponent from "../../components/ManageUser/BlockedUsers";
import ManageUsersFlaggedUsersComponent from "../../components/ManageUser/FlaggedUsers";

const UsersManagementPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabsCompnent = [
    <ManageUsersAllUsersComponent />,
    <ManageUsersBlockedUsersComponent />,
    <ManageUsersFlaggedUsersComponent />,
  ];

  return (
    <div className="UsersManagementPage">
      <Box p={4}>
        <Typography variant="h3" component="h1">
          Manage users
        </Typography>
        <br />
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="All Users" />
          <Tab label="Blocked" />
        </Tabs>

        <Box>{tabsCompnent[value]}</Box>
      </Box>
    </div>
  );
};

export default UsersManagementPage;
