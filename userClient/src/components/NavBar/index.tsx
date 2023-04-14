import "./style.css";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { fetchUserData, setUser } from "../../redux/userSlice";
import { authBackend } from "../../configs/axios";

const NavBar = () => {
  const [isScrolled, setIsScorlled] = useState(false);
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

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
    <>
      <div className="NavBar pc">
        <ul>
          <Link to={"/"}>
            <div className="logoImgCong">
              <img className="logo" src="/logo.png" alt="" />
            </div>
          </Link>
        </ul>

        <ul>
          {user && (
            <Tooltip title="Create new blog">
              <Button className="CreateIcon" variant="outlined" onClick={() => logoutUser()}>
                <CreateIcon fontSize="small" /> Create Blog
              </Button>
            </Tooltip>
          )}
          <Link to={"/explore"}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to={"/chat"}>
            <IconButton>
              <MessageIcon />
            </IconButton>
          </Link>
          {user && (
            <Link to={"/settings/account"}>
              <li className="no">
                <Avatar alt={user?.email} src={user?.photoURL} />
              </li>
            </Link>
          )}
          {!user && (
            <Link to={"/auth/login"}>
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </ul>
      </div>

      <div className="Navcontent">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
