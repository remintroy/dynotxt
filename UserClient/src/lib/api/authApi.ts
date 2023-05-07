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
  if (result?.error?.status === 403) {
    const refreshResponse: any = await baseQuery("/refresh", apis, extraOptions);
    if (refreshResponse.data) {
      apis.dispatch(refresh(refreshResponse.data?.accessToken));
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
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ idToken }) => ({
        url: "/signin",
        method: "POST",
        body: {
          idToken,
        },
      }),
    }),
    getUserData: builder.query({
      query: () => "/user_data",
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
} = userApiSlice;