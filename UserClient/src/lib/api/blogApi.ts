import { logout, refresh } from "../redux/userSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server.dynotxt.com/blog/api/v1",
  credentials: "include",
  prepareHeaders(headers, api: any) {
    const token = api.getState().user.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithRefetch = async (args: any, apis: any, extraOptions: any) => {
  let result = await baseQuery(args, apis, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResponse: any = await baseQuery("https://server.dynotxt.com/auth/api/v1", apis, extraOptions);
    if (refreshResponse.data) {
      apis.dispatch(refresh(refreshResponse.data?.accessToken));
      result = await baseQuery(args, apis, extraOptions);
    } else {
      apis.dispatch(logout());
    }
  }
  return result;
};

const blogApiSlice = createApi({
  reducerPath: "blogapi",
  baseQuery: baseQueryWithRefetch,
  endpoints: (builder) => ({
    getBlog: builder.query({
      query: ({ blogId }) => `/blog/${blogId}`,
    }),
    getComments: builder.query({
      query: (blogId) => `/comment/${blogId}`,
    }),
    postNewComment: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `/comment/${blogId}`,
        method: "PUT",
        body: { message: data },
      }),
    }),
  }),
});

export const blogApiEndpoints = blogApiSlice.endpoints;
export const blogApiReducer = blogApiSlice.reducer;
export const blogApiReducerPath = blogApiSlice.reducerPath;
export const blogApiMiddleware = blogApiSlice.middleware;
export const { useGetBlogQuery, useGetCommentsQuery, usePostNewCommentMutation } = blogApiSlice;
