import {
  Avatar,
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
import { authBackend } from "../../../configs/axios";
import { useAppSelector } from "../../../redux/hooks";

const ManageUsersAllUsersComponent = () => {
  const user = useAppSelector((state) => state.user.data);
  const [userDataList, setUserDataList] = useState({
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUserDataList = async () => {
    try {
      const { data } = await authBackend.get(`/client?page=${page ?? 1}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setUserDataList(data);
      user && setLoading(false);
    } catch (error) {
      user && setLoading(false);
      console.log(error);
    }
  };

  const setLoadingForUserListElement = (index: number, state: boolean) => {
    setUserDataList((pre: any) => {
      let val = pre.docs;
      val[index] = { ...val[index], loading: state };
      return { ...pre, docs: val };
    });
  };

  const handleDisabledChange = async (e: any, index: number, data: any) => {
    try {
      setLoadingForUserListElement(index, true);

      const response = await authBackend.put(
        `/client/${data.uid}/${e.target.checked ? "enable" : "disable"}`,
        {},
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      await fetchUserDataList();
      setLoadingForUserListElement(index, false);
    } catch (error) {
      setLoadingForUserListElement(index, false);
    }
  };

  useEffect(() => {
    fetchUserDataList();
  }, [user]);

  return (
    <div className="ManageUsersAllUsersComponent">
      {loading && (
        <>
          <br />
          <CircularProgress />
        </>
      )}
      <Box mt={3}>
        {userDataList.docs.map((user: any, index) => (
          <ListItem key={user.uid}>
            <ListItemIcon>
              <Avatar src={user.photoURL} />
            </ListItemIcon>
            <ListItemText primary={user.name ?? "-"} secondary={user.email} />
            <Typography mr={2}>
              <Chip label={user.disabled ? "Disabled" : "Enabled"} color={user.disabled ? "error" : "success"} />
            </Typography>
            {user.loading && <CircularProgress size="20px" />}
            <Switch checked={!user.disabled} onChange={(e) => handleDisabledChange(e, index, user)}></Switch>
          </ListItem>
        ))}
      </Box>
    </div>
  );
};

export default ManageUsersAllUsersComponent;
