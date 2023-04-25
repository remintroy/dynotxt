import NavBar from "./components/NavBar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ThemeProvider, createTheme } from "@mui/material";
import Settings from "./pages/Settings";
import AccountSettings from "./components/AccountSettings";
import VerfyEmail from "./pages/VerifyEmail";
import ProfilePage from "./pages/Profile";
import BlogView from "./pages/BlogView";
import CreateBlog from "./pages/CreateBlog";
import { useAppDispatch } from "./redux/hooks";
import { setThisIsPcConfig } from "./redux/configSlice";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <Error />,
    children: [
      {
        path: "/test",
        element: <BlogView />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          {
            path: "account",
            element: <AccountSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/blog/create",
    element: <CreateBlog />,
  },
  {
    path: "/user",
    element: <ProfilePage />,
  },
  {
    path: "/auth/verify-email/:uid",
    element: <VerfyEmail />,
    errorElement: <Error />,
  },
  {
    path: "/auth/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setThisIsPcConfig(window.innerWidth > 766));
    window.addEventListener("resize", () => dispatch(setThisIsPcConfig(window.innerWidth > 766)));
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
