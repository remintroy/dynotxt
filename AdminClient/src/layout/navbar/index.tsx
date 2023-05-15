import "./style.scss";
import { Link, Outlet } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { useTheme } from "@emotion/react";
import { useAppSelector } from "../../lib/redux/hooks";
import StyledThemeSwitchComponent from "./styledThemeSwitch";
import SideBarNavComponent from "./sidebar";
import TopBarNavComponent from "./topbar";

const NavBarMainComponent = () => {
  const theme: any = useTheme();

  return (
    <div
      className="NavbarMainComponent"
      style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
    >
      <TopBarNavComponent />
      <SideBarNavComponent />
      <div className="AppBody">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBarMainComponent;
