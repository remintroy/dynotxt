import { logout, refresh } from "../redux/slices/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server.dynotxt.com/blog/api/v1",
  credentials: "include",
  prepareHeaders: async (headers, api: any) => {
    const token = api.getState().user.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    else {
      try {
        const response: any = await fetch("https://server.dynotxt.com/auth/api/v1/user_data", {
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
    const refreshResponse: any = await baseQuery("https://server.dynotxt.com/auth/api/v1/refresh", apis, extraOptions);
    if (refreshResponse?.data?.accessToken) {
      apis.dispatch(refresh(refreshResponse?.data?.accessToken));
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
  tagTypes: ["comments", "blogDisplay", "deletedBlogs", "home", "reactionStatus"],
  endpoints: (builder) => ({
    getBlog: builder.query({
      query: ({ blogId }) => `/blog/${blogId}`,
    }),
    createNewBlog: builder.mutation({
      query: () => ({
        url: "/blog",
        method: "POST",
      }),
    }),
    getComments: builder.query({
      query: (blogId) => `/comment/${blogId}`,
      providesTags: ["comments"],
    }),
    postNewComment: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `/comment/${blogId}`,
        method: "PUT",
        body: { message: data },
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ blogId, commentId }) => ({
        url: `/comment/${blogId}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
    getImageUploadUrl: builder.mutation({
      query: (blogId) => `/upload/${blogId}`,
    }),
    putBlogImageUrl: builder.mutation({
      query: ({ blogId, bannerImgURL }) => ({
        url: `/blog/${blogId}`,
        method: "PUT",
        body: { bannerImgURL },
      }),
    }),
    putCurrentState: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `/blog/${blogId}`,
        method: "PUT",
        body: data,
      }),
    }),
    putPublishBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}/publish`,
        method: "PUT",
      }),
      invalidatesTags: ["blogDisplay"],
    }),
    putUnPublishBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}/unpublish`,
        method: "PUT",
      }),
      invalidatesTags: ["blogDisplay", "home"],
    }),
    getBlogDataDisplay: builder.query({
      query: ({ uid, page }) => `/user/${uid}?page=${page}`,
      providesTags: ["blogDisplay"],
    }),
    deleteBlogWithBlogId: builder.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogDisplay", "deletedBlogs", "home"],
    }),
    permenentlyDeleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}/permenent`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogDisplay", "deletedBlogs", "home"],
    }),
    getAllTrashedBlogs: builder.query({
      query: ({ page }) => `/trash?page=${page || 1}`,
      providesTags: ["deletedBlogs"],
    }),
    putRecoverTrashedBlog: builder.mutation({
      query: (blogId) => ({
        url: `/trash/${blogId}`,
        method: "PUT",
      }),
      invalidatesTags: ["deletedBlogs", "blogDisplay"],
    }),
    getBlogsForHome: builder.query({
      query: () => `/public/all`,
      providesTags: ["home"],
    }),
    getBlogReactionStatus: builder.query({
      query: (blogId) => `/like/${blogId}`,
      providesTags: ["reactionStatus"],
    }),
    postBlogLike: builder.mutation({
      query: (blogId) => ({
        url: `/like/${blogId}`,
        method: "POST",
      }),
      invalidatesTags: ["reactionStatus"],
    }),
    postBlogDislike: builder.mutation({
      query: (blogId) => ({
        url: `/dislike/${blogId}`,
        method: "POST",
      }),
      invalidatesTags: ["reactionStatus"],
    }),
    deleteBlogLike: builder.mutation({
      query: (blogId) => ({
        url: `/like/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reactionStatus"],
    }),
    deleteBlogDislike: builder.mutation({
      query: (blogId) => ({
        url: `/dislike/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reactionStatus"],
    }),
    postBlogReport: builder.mutation({
      query: ({ blogId, message }) => ({
        url: `/report/${blogId}`,
        method: "POST",
        body: { message },
      }),
    }),
    postBlogViewCount: builder.mutation({
      query: (blogId) => ({
        url: `/analytics/view/${blogId}`,
        method: "POST",
      }),
    }),
    getBlogViewCountByBlogId: builder.query({
      query: (blogId) => `/analytics/view/${blogId}`,
    }),
    getBlogViewCountByUserId: builder.query({
      query: () => `/analytics/view/`,
    }),
    getSearchResults: builder.mutation({
      query: ({ query, page }: any) => {
        let encodedQuery = encodeURIComponent(query);
        return `/search?query=${encodedQuery}&page=${page}`;
      },
    }),
    getBlogSearch: builder.query({
      query: ({ query, page }: any) => {
        let encodedQuery = encodeURIComponent(query);
        return `/search?query=${encodedQuery}&page=${page}`;
      },
    }),
    getSearchBlogCategory: builder.mutation({
      query: (searchQuery: string) => {
        let encodedQuery = encodeURIComponent(searchQuery);
        return `/search/category?query=${encodedQuery}`;
      },
    }),
  }),
});

export const blogApiEndpoints = blogApiSlice.endpoints;
export const blogApiReducer = blogApiSlice.reducer;
export const blogApiReducerPath = blogApiSlice.reducerPath;
export const blogApiMiddleware = blogApiSlice.middleware;
export const {
  useCreateNewBlogMutation,
  useGetBlogQuery,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  usePostNewCommentMutation,
  useGetImageUploadUrlMutation,
  usePutBlogImageUrlMutation,
  usePutCurrentStateMutation,
  usePutPublishBlogMutation,
  useGetBlogDataDisplayQuery,
  usePutUnPublishBlogMutation,
  useDeleteBlogWithBlogIdMutation,
  usePermenentlyDeleteBlogMutation,
  useGetAllTrashedBlogsQuery,
  usePutRecoverTrashedBlogMutation,
  useGetBlogsForHomeQuery,
  usePostBlogLikeMutation,
  usePostBlogDislikeMutation,
  useDeleteBlogLikeMutation,
  useDeleteBlogDislikeMutation,
  useGetBlogReactionStatusQuery,
  usePostBlogReportMutation,
  usePostBlogViewCountMutation,
  useGetBlogViewCountByBlogIdQuery,
  useGetBlogViewCountByUserIdQuery,
  useGetSearchResultsMutation,
  useGetBlogSearchQuery,
  useGetSearchBlogCategoryMutation,
} = blogApiSlice;
