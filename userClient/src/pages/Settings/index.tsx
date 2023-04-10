import "./style.css";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Settings = () => {
  return (
    <div className="SettingsPage">
      <Container>
        <br />
        <h1>
          Settings <span className="dim"> / Account settings</span>
        </h1>
        <br />
        <Outlet></Outlet>
        {/* <Card variant="outlined" className="SettingsCont"></Card> */}
      </Container>
    </div>
  );
};

export default Settings;
