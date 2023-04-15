import makeBlog from "../blog";
import { addNewBlog, getBlogById } from "../data-access/blog.db";

export default function createAddBlog({createError}) {
  return async function addBlog({ data }) {
    const blog = makeBlog(data);

    if (getBlogById(blog.getId())) throw new Error("Blog already exists");

    return await addNewBlog(blog);
  };
}
