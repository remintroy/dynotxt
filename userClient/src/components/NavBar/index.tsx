import "./style.scss";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import CreateIcon from "@mui/icons-material/Create";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { fetchUserData, setUser } from "../../redux/userSlice";
import { authBackend } from "../../configs/axios";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

const NavBar = () => {
  // const [isScrolled, setIsScorlled] = useState(false); 
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const user = useAppSelector((state) => state.user.data);
  const allowBottomNav = useAppSelector((state) => state.navBar.allowBottomNav);
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
              <img className="logo" src="/logo-large.png" alt="" />
            </div>
          </Link>
        </ul>

        <ul>
          {user && thisIsPc && (
            <Tooltip title="Create new blog">
              <Link to="/blog/create" className="link">
                <Button className="CreateIcon" variant="outlined">
                  <CreateIcon fontSize="small" /> Create Blog
                </Button>
              </Link>
            </Tooltip>
          )}
          <Link to={"/explore"} className="link">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Link>
          {thisIsPc && (
            <Link to={"/chat"}>
              <IconButton>
                <MessageIcon />
              </IconButton>
            </Link>
          )}
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

      {!thisIsPc && allowBottomNav && (
        <ul className="BottomNav ">
          <Link to="/" className="link">
            <li>
              <HomeIcon />
            </li>
          </Link>
          <Link to="/blog/create" className="link">
            <li>
              <AddCircleIcon />
            </li>
          </Link>
          <Link to="/chat" className="link">
            <li>
              <MessageIcon />
            </li>
          </Link>
          <Link to="/settings" className="link">
            <li>
              <SettingsIcon />
            </li>
          </Link>
        </ul>
      )}
    </>
  );
};

export default NavBar;
