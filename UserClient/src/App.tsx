import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/Auth";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { fetchUserData } from "./redux/userSlice";
import NavBarComponent from "./components/NavBar";
import NothingFoundBackground from "./pages/Error";
import HomePage from "./pages/Home";
import CreateBlogPage from "./pages/CreateBlog";
import VerifyEmailComponent from "./components/Auth/VerifyEmail";
import SignIn from "./components/Auth/Sgnin";
import SignUp from "./components/Auth/Signup";
import { Notifications } from "@mantine/notifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarComponent />,
    errorElement: <NothingFoundBackground />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/blog/create",
    element: <CreateBlogPage />,
  },
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <NothingFoundBackground />,
    children: [
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/auth/verify-email/:uid",
        element: <VerifyEmailComponent />,
      },
    ],
  },
]);

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <div className="App">
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
