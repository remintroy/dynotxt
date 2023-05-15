import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, colors, createTheme } from "@mui/material";
import Login from "./pages/login";
import Error from "./pages/error";
import NavBarMainComponent from "./layout/navbar";
import { useEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext";
import UsersManagementPage from "./pages/users";
import { useAppDispatch } from "./lib/redux/hooks";
import ManageBlogsPage from "./pages/blogs";
import { useGetAdminDataQuery } from "./lib/api/authApi";
import { setUser } from "./lib/redux/userSlice";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarMainComponent />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "users",
        element: <UsersManagementPage />,
      },
      {
        path: "blogs",
        element: <ManageBlogsPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
    errorElement: <Error />,
  },
]);

function App() {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark((pre) => !pre);
  };

  const darkTheme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: {
        main: dark ? colors.blueGrey[500] : colors.blueGrey[600],
      },
    },
  });

  const { data } = useGetAdminDataQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data]);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ dark, toggleTheme }}>
        <ThemeProvider theme={darkTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
