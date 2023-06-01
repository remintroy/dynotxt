import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./lib/redux/hooks";
import { useGetUserDataQuery } from "./lib/api/authApi";
import { resetUserData, setUser, setUserStatus } from "./lib/redux/slices/user";
import { Suspense, lazy, useEffect } from "react";
import NavbarLayout from "./layout/Navbar";
import AppLoaderComponent from "./components/AppLoader";
import AuthLayout from "./layout/Navbar/Auth";
import ProfilePage from "./pages/Settings/Profile";
import BlogsSettingsPage from "./pages/Settings/Blogs";
import ViewBlogPage from "./pages/Blog/ViewBlog";
import ProfileSettingsDashboardPage from "./pages/Settings/Dashboard";
import useSocketHook from "./hooks/useSocket";
const EditBlogPage = lazy(() => import("./pages/Blog/EditBlog"));
const SignInPage = lazy(() => import("./pages/Auth/Signin"));
const SignUpPage = lazy(() => import("./pages/Auth/Signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "blog/:id",
        element: <ViewBlogPage />,
      },
      {
        path: "profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "profile/:id/dashboard",
        element: <ProfileSettingsDashboardPage />,
      },
      {
        path: "profile/:id/blogs",
        element: <BlogsSettingsPage />,
      },
    ],
  },
  {
    path: "blog/edit/:id",
    element: (
      <Suspense fallback={<AppLoaderComponent />}>
        <EditBlogPage />
      </Suspense>
    ),
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: (
          <Suspense fallback={<AppLoaderComponent />}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<AppLoaderComponent />}>
            <SignUpPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  const { data, isError, isLoading, isFetching } = useGetUserDataQuery({});
  const dispatch = useAppDispatch();

  /**
   * Adds user data or the status of user data to redux
   * This runs on every time page loads
   */
  useEffect(() => {
    dispatch(setUserStatus({ error: isError, loading: isLoading || isFetching }));
    if (data) {
      dispatch(resetUserData());
      dispatch(setUser(data));
    }
  }, [data, isFetching, isLoading, isError]);

  useSocketHook();

  return (
    <div>
      {isLoading ? <AppLoaderComponent /> : ""}
      <ModalsProvider>
        <Notifications />
        <RouterProvider router={router} />
      </ModalsProvider>
    </div>
  );
}

export default App;
