import { blogDb } from "../data-access";

export default function createGetBlogDataById() {
  return async function createBlog(blogId: string) {
    return await blogDb.getBlogById(blogId);
  };
}
