import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.scss";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import styled from "@emotion/styled";
import { Home } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useAppSelector } from "../../redux/hooks";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const NavBarMainComponent = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const theme: any = useTheme();
  const user = useAppSelector((state) => state.user.data);
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <div
      className="NavbarMainComponent"
      style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
    >
      <div className="TopNav">
        <Box sx={{ flexGrow: 1, borderBottom: `1px solid ${theme.palette.action.hover}` }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Manager Dashboard
            </Typography>
            <MaterialUISwitch checked={dark} onClick={() => toggleTheme()} />
            {user && <Avatar src="" sx={{ ml: 1 }} />}
            {!user && (
              <Link to="/auth/login" className="link">
                <Button variant="outlined">Login</Button>
              </Link>
            )}
          </Toolbar>
        </Box>
      </div>
      <div className="SideBar" style={{ borderRight: `1px solid ${theme.palette.action.hover}` }}>
        <List>
          <Link className="link" to="/">
            <ListItem disablePadding>
              <ListItemButton selected={paths.length == 0}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link className="link" to="/users">
            <ListItem disablePadding>
              <ListItemButton selected={paths[0] == "users"}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link className="link" to="/blogs">
            <ListItem disablePadding>
              <ListItemButton selected={paths[0] == "blogs"}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Blogs" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </div>
      <div className="AppBody">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBarMainComponent;
