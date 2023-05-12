import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, refresh } from "../redux/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server.dynotxt.com/auth/api/v1",
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

const userApiSlice = createApi({
  reducerPath: "authapi",
  baseQuery: baseQueryWithRefetch,
  tagTypes: ["userData", "allUserData", "singleFollow", "userDataPublic"],
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ idToken }) => ({
        url: "/signin",
        method: "POST",
        body: {
          idToken,
        },
      }),
      invalidatesTags: ["userData", "allUserData"],
    }),
    getUserData: builder.query({
      query: () => "/user_data",
      providesTags: ["userData"],
    }),
    getVerificationStatus: builder.query({
      query: ({ uid }) => `/verify_email/${uid}`,
    }),
    vefifyEmailWithOtp: builder.mutation({
      query: ({ otp, uid }) => ({
        url: `/verify_email/${uid}`,
        method: "POST",
        body: {
          otp,
        },
      }),
    }),
    refreshToken: builder.query({
      query: () => "/refresh",
    }),
    getAuthorData: builder.query({
      query: (uid) => `/user/${uid}`,
    }),
    getUserDataWithUid: builder.query({
      query: (uid) => `/user/${uid}`,
      providesTags: ["userDataPublic"],
    }),
    getFullUserData: builder.query({
      query: () => `/profile/details`,
      providesTags: ["allUserData"],
    }),
    putUserData: builder.mutation({
      query: (data) => ({
        url: "/user_data",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["userData", "allUserData"],
    }),
    putUserPersionalData: builder.mutation({
      query: (data) => ({
        url: "/user_data/persional",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["userData", "allUserData"],
    }),
    postFollowUser: builder.mutation({
      query: (uid) => ({
        url: `/follows/${uid}`,
        method: "POST",
      }),
      invalidatesTags: ["singleFollow", "userDataPublic"],
    }),
    getFollowUser: builder.query({
      query: (uid) => `/follows/${uid}`,
      providesTags: ["singleFollow"],
    }),
  }),
});

export const userApiEndpoints = userApiSlice.endpoints;
export const userApiReducer = userApiSlice.reducer;
export const userApiReducerPath = userApiSlice.reducerPath;
export const userApiMiddleware = userApiSlice.middleware;
export const {
  useGetAuthorDataQuery,
  useSigninMutation,
  useGetUserDataQuery,
  useGetVerificationStatusQuery,
  useVefifyEmailWithOtpMutation,
  useGetUserDataWithUidQuery,
  useGetFullUserDataQuery,
  usePutUserDataMutation,
  usePutUserPersionalDataMutation,
  usePostFollowUserMutation,
  useGetFollowUserQuery,
} = userApiSlice;
