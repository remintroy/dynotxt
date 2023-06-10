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
import NotificationsTabPage from "./pages/Tabs/Notifications";
import SettingsTabPage from "./pages/Tabs/Settings";
import AccountProfilePage from "./pages/Settings/Account";
import SearchTabPage from "./pages/Tabs/Search";
import VerfiyEmailPage from "./pages/Auth/VerifyEmail";
import HomePage from "./pages/Home";
import BlogAnalyticsSettingsPage from "./pages/Settings/BlogAnalytics";

const EditBlogPage = lazy(() => import("./pages/Blog/EditBlog"));
const SignInPage = lazy(() => import("./pages/Auth/Signin"));
const SignUpPage = lazy(() => import("./pages/Auth/Signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "blog/:id",
        element: <ViewBlogPage />,
      },
      {
        path: "/blog/analytics/:id",
        element: <BlogAnalyticsSettingsPage />,
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
      {
        path: "profile/:id/account",
        element: <AccountProfilePage />,
      },
      {
        path: "tab/notifications",
        element: <NotificationsTabPage />,
      },
      {
        path: "tab/settings",
        element: <SettingsTabPage />,
      },
      {
        path: "tab/search",
        element: <SearchTabPage />,
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
      {
        path: "verify-email/:uid",
        element: (
          <Suspense fallback={<AppLoaderComponent />}>
            <VerfiyEmailPage />
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
    if (data && !isError && !isLoading && !isFetching) {
      dispatch(resetUserData());
      dispatch(setUser(data));
    }
  }, [data, isFetching, isLoading, isError]);

  useSocketHook();

  return (
    <div >
      {isLoading ? <AppLoaderComponent /> : ""}
      <ModalsProvider>
        <Notifications />
        <RouterProvider router={router} />
      </ModalsProvider>
    </div>
  );
}

export default App;
