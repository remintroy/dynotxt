import makeBlog from "../blog";
import { blogDb } from "../data-access/";

export default function createAddBlog({ createError }) {
  return async function addBlog({ data }) {
    const blog = makeBlog(data);
    const existingBLog = await blogDb.getBlogById(blog.getId());

    if (existingBLog) throw new Error("Blog already exists");

    return await blogDb.addNewBlog(blog.getData());
  };
}
