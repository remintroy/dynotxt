import makeBlog from "../blog";
import { IMakeBlogData } from "../blog/types.blog";
import { blogDb } from "../data-access";

export default function createCreateBlog({ blogId }) {
  return async function createBlog(data: IMakeBlogData) {
    const id = await blogId.createId();
    const blog = makeBlog({ ...data, blogId: id }).getData();
    await blogDb.addNewBlog(blog);
    return id;
  };
}
