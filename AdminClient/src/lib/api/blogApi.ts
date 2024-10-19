import { logout, refresh } from "../redux/userSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server-dynotxt.remin.in/blog/su/api/v1",
  credentials: "include",
  prepareHeaders: async (headers, api: any) => {
    const token = api.getState().user.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    else {
      try {
        const response: any = await fetch("https://server-dynotxt.remin.in/auth/su/api/v1/user_data", {
          credentials: "include",
        });
        const data = await response.json();
        headers.set("Authorization", `Bearer ${data?.accessToken}`);
      } catch (error) {
        console.log(error);
      }
    }
    return headers;
  },
});

const baseQueryWithRefetch = async (args: any, apis: any, extraOptions: any) => {
  let result = await baseQuery(args, apis, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResponse: any = await baseQuery(
      "https://server-dynotxt.remin.in/auth/su/api/v1/refresh",
      apis,
      extraOptions
    );
    if (refreshResponse?.data?.accessToken) {
      apis.dispatch(refresh(refreshResponse?.data?.accessToken));
      result = await baseQuery(args, apis, extraOptions);
    } else {
      apis.dispatch(logout());
    }
  }
  return result;
};

const blogSlice = createApi({
  baseQuery: baseQueryWithRefetch,
  reducerPath: "blogapi",
  tagTypes: ["flaggedBlogs", "disabledBlogs"],
  endpoints: (builder) => ({
    getFlaggedBlogs: builder.query({
      query: () => `/blog/flagged`,
      providesTags: ["flaggedBlogs"],
    }),
    deleteFlaggesForSingleBlog: builder.mutation({
      query: (blogId) => ({ url: `/blog/flagged/${blogId}`, method: "DELETE" }),
      invalidatesTags: ["flaggedBlogs"],
    }),
    putDisableBlog: builder.mutation({
      query: (blogId) => ({ url: `/blog/flagged/${blogId}`, method: "PUT" }),
      invalidatesTags: ["flaggedBlogs", "disabledBlogs"],
    }),
    putEnableBlog: builder.mutation({
      query: (blogId) => ({ url: `/blog/flagged/${blogId}/enable`, method: "PUT" }),
      invalidatesTags: ["flaggedBlogs", "disabledBlogs"],
    }),
    getAllDisabledBlogs: builder.query({
      query: () => `/blog/disabled/`,
      providesTags: ["disabledBlogs"],
    }),
  }),
});

export const blogApiEndpoints = blogSlice.endpoints;
export const blogApiReducer = blogSlice.reducer;
export const blogApiReducerPath = blogSlice.reducerPath;
export const blogApiMiddleware = blogSlice.middleware;
export const {
  useGetFlaggedBlogsQuery,
  usePutDisableBlogMutation,
  usePutEnableBlogMutation,
  useDeleteFlaggesForSingleBlogMutation,
  useGetAllDisabledBlogsQuery,
} = blogSlice;
