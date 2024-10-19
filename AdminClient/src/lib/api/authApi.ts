import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, refresh } from "../redux/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server-dynotxt.remin.in/auth/su/api/v1/",
  credentials: "include",
  prepareHeaders(headers, api: any) {
    const token = api.getState().user.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithRefetch = async (args: any, apis: any, extraOptions: any) => {
  let result = await baseQuery(args, apis, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResponse: any = await baseQuery("/refresh", apis, extraOptions);
    if (refreshResponse?.data?.accessToken) {
      apis.dispatch(refresh(refreshResponse?.data?.accessToken));
      result = await baseQuery(args, apis, extraOptions);
    } else {
      apis.dispatch(logout());
    }
  }
  return result;
};

const authSlice = createApi({
  baseQuery: baseQueryWithRefetch,
  reducerPath: "authapi",
  tagTypes: ["userlist"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: any) => ({ url: "/signin", method: "POST", body }),
    }),
    getAdminData: builder.query({
      query: () => ({ url: "/user_data" }),
    }),
    getAllUsers: builder.query({
      query: ({ page }) => ({ url: `/client?page=${page ?? 1}` }),
      providesTags: ["userlist"],
    }),
    getDisabledUsers: builder.query({
      query: ({ page }) => ({ url: `/client/disabled?page=${page ?? 1}` }),
      providesTags: ["userlist"],
    }),
    putUserDisabledStatus: builder.mutation({
      query: ({ uid, disabled }) => ({ url: `/client/${uid}/${disabled ? "disable" : "enable"}`, method: "PUT" }),
      invalidatesTags: ["userlist"],
    }),
  }),
});

export const authApiEndpoints = authSlice.endpoints;
export const authApiReducer = authSlice.reducer;
export const authApiReducerPath = authSlice.reducerPath;
export const authApiMiddleware = authSlice.middleware;
export const {
  useLoginMutation,
  useGetAdminDataQuery,
  useGetAllUsersQuery,
  useGetDisabledUsersQuery,
  usePutUserDisabledStatusMutation,
} = authSlice;
