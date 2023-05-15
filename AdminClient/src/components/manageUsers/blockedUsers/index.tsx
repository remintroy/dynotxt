import {
  Avatar,
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../lib/redux/hooks";
import { useGetDisabledUsersQuery, usePutUserDisabledStatusMutation } from "../../../lib/api/authApi";

const ManageUsersBlockedUsersComponent = () => {
  const user = useAppSelector((state) => state.user.data);
  const [page, setPage] = useState(1);
  const [usersList, setUsersList] = useState({
    docs: [],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });

  const { data: blockedUsers, isLoading } = useGetDisabledUsersQuery({ page }, { skip: !user });
  const [updateDisabledState] = usePutUserDisabledStatusMutation();

  useEffect(() => setUsersList(blockedUsers), [blockedUsers]);

  const [open, setOpen] = useState(false);

  const handleDisabledChange = async (e: any, data: any) => {
    try {
      setOpen(true);
      await updateDisabledState({ uid: data.uid, disabled: !e.target.checked });
      setOpen(false);
    } catch (error) {
      setOpen(false);
    }
  };

  return (
    <div className="ManageUsersAllUsersComponent">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress />
      </Backdrop>
      {isLoading && (
        <>
          <br />
          <CircularProgress />
        </>
      )}
      <Box mt={3}>
        {usersList?.docs?.map((user: any) => (
          <ListItem key={user.uid}>
            <ListItemIcon>
              <Avatar src={user.photoURL} />
            </ListItemIcon>
            <ListItemText primary={user.name ?? "-"} secondary={user.email} />
            <Chip
              sx={{ mr: 2 }}
              label={user.disabled ? "Disabled" : "Enabled"}
              color={user.disabled ? "error" : "success"}
            />
            {user.loading && <CircularProgress size="20px" />}
            <Switch checked={!user.disabled} onChange={(e) => handleDisabledChange(e, user)}></Switch>
          </ListItem>
        ))}
        {usersList?.docs?.length == 0 && !isLoading && (
          <Box py={1} px={2}>
            Good, There is no disabled users
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ManageUsersBlockedUsersComponent;
