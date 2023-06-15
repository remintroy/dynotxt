import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../lib/redux/hooks";
import { useEffect } from "react";
import { Box } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

const AuthLayout = () => {
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div>
      <NavigationProgress />
      <Box mt={100}>
        <Outlet />
      </Box>
    </div>
  );
};

export default AuthLayout;
