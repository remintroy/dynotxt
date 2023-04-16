import { blogDb } from "../data-access";

export default function createDeleteBlog() {
  return async function deleteBlog(blogId:string) {
    return blogDb.deleteBlog(blogId);
  };
}
