import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserData, setUser } from "../../redux/userSlice";
import { Box, Button, Typography } from "@mui/material";
import { authBackend } from "../../configs/axios";
import { Link } from "react-router-dom";
import "./style.scss";

const Home = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const logoutUser = async () => {
    try {
      const { data } = await authBackend.get("/logout", {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setUser(null));
  };

  return (
    <div className="Home">
      <Box p={3}>
        <Typography component="h1" variant="h3">Dashboard</Typography>
        <div>Name : {user?.name}</div>
        <div>Email : {user?.email}</div>
        {user && (
          <Button variant="outlined" onClick={() => logoutUser()}>
            Logout
          </Button>
        )}
        {!user && (
          <Link to={"/auth/login"}>
            <Button variant="outlined">Login</Button>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Home;
