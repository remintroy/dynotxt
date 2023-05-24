import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/auth";
import NavBarComponent from "./layout/navbar";
import NothingFoundBackground from "./pages/error";
import HomePage from "./pages/home";
import SignIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import { Notifications } from "@mantine/notifications";
import UserProfilePage from "./pages/profile/";
import BlogViewPage from "./pages/blog/viewBlog";
import VerfiyEmailPage from "./pages/auth/verifyEmail";
import { useGetUserDataQuery } from "./lib/api/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "./lib/redux/hooks";
import { resetUserData, setUser, setUserStatus } from "./lib/redux/userSlice";
import EditBlogPage from "./pages/blog/editBlog";
import { Box } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import TestPage from "./pages/test";
import PageInitialLoader from "./components/pageInitialLoader";
import ProfileDashboardLayout from "./layout/profileDashboard";
import ProfileBlogsPage from "./pages/profile/blogs";
import ProfileCommentsPage from "./pages/profile/comments";

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
      {
        path: "blog/:id",
        element: <BlogViewPage />,
      },
    ],
  },
  {
    path: "/profile/:id",
    element: <ProfileDashboardLayout />,
    children: [
      {
        path: "/profile/:id",
        element: <UserProfilePage />,
      },
      {
        path: "/profile/:id/blogs",
        element: <ProfileBlogsPage />,
      },
      {
        path: "/profile/:id/comments",
        element: <ProfileCommentsPage />,
      },
    ],
  },
  {
    path: "/blog/edit/:id",
    element: <EditBlogPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
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
        element: <VerfiyEmailPage />,
      },
    ],
  },
]);

function App() {
  const { data, isError, isLoading, isFetching } = useGetUserDataQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(resetUserData());
      dispatch(setUserStatus({ error: true }));
    } else if (isFetching || isLoading) {
      dispatch(resetUserData());
      dispatch(setUserStatus({ loading: true }));
    } else if (data) {
      dispatch(resetUserData());
      dispatch(setUser(data));
    }
  }, [data, isFetching, isLoading, isError]);

  return (
    <Box className="App">
      {isLoading && <PageInitialLoader />}
      {!isLoading && (
        <ModalsProvider>
          <Notifications />
          <RouterProvider router={router} />
        </ModalsProvider>
      )}
    </Box>
  );
}

export default App;
