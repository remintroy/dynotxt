import { useTheme } from "@emotion/react";
import { Home, Group, Article } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SideBarNavComponent = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);
  const theme: any = useTheme();

  return (
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
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="link" to="/blogs">
          <ListItem disablePadding>
            <ListItemButton selected={paths[0] == "blogs"}>
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

export default SideBarNavComponent;
