import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, colors, createTheme } from "@mui/material";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import NavBarMainComponent from "./components/NavBar";
import { useEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext";
import UsersManagementPage from "./pages/Users";
import { useAppDispatch } from "./redux/hooks";
import { fetchUserData } from "./redux/userSlice";
import ManageBlogsPage from "./pages/Blogs";

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
        main: colors.teal[500],
      },
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

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
