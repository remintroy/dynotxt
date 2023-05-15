import { useAppSelector } from "../../lib/redux/hooks";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.scss";

const Home = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <div className="Home">
      <Box p={4}>
        <Typography component="h1" variant="h3">
          Dashboard
        </Typography>
        <div>Name : {user?.name}</div>
        <div>Email : {user?.email}</div>
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
