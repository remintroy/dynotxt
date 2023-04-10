import "./style.css";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import { Avatar } from "@mui/material"; 
import { fetchUserData } from "../../redux/userSlice";

const NavBar = () => {
  const [isScrolled, setIsScorlled] = useState(false);
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      <div className="NavBar pc">
        <ul>
          <Link to={"/"}>
            <li className="on">
              <HomeIcon />
            </li>
          </Link>
          <Link to={"/explore"}>
            <li>
              <SearchIcon />
            </li>
          </Link>
          <Link to={"/chat"}>
            <li>
              <MessageIcon />
            </li>
          </Link>
        </ul>

        <ul>
          <li>
            <SettingsIcon />
          </li>

          <Link to={"/settings/account"}>
            <li className="no">
              <Avatar alt={user?.email} src={user?.photoURL} />
            </li>
          </Link>
        </ul>
      </div>

      <div className="Navcontent">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
