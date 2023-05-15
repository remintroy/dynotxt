import { Menu } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import StyledThemeSwitchComponent from "./styledThemeSwitch";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../lib/redux/hooks";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { useTheme } from "@emotion/react";

const TopBarNavComponent = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const user = useAppSelector((state) => state.user.data);
  const theme: any = useTheme();

  return (
    <div className="TopNav">
      <Box sx={{ flexGrow: 1, borderBottom: `1px solid ${theme.palette.action.hover}` }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Manager Dashboard
          </Typography>
          <StyledThemeSwitchComponent checked={dark} onClick={() => toggleTheme()} />
          {user && <Avatar src="" sx={{ ml: 1 }} />}
          {!user && (
            <Link to="/auth/login" className="link">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </Toolbar>
      </Box>
    </div>
  );
};

export default TopBarNavComponent;
