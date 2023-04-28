import React from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthPage;
