import { Blog } from "../../../entities/blog";
import BlogModel from "../models/blog";

const blogRepositoryImpl = () => {
  const getBlogById = async (blogId: string) => {
    const response = await BlogModel.findOne({ blogId });
    if (response?.deleted) return null;
    return response;
  };

  const addNewBlog = async (blogData: Blog) => {
    const response = await new BlogModel(blogData).save();
    return response;
  };

  const updateBlog = async (blogId: string, blogData: Blog) => {
    const response = await BlogModel.updateOne(
      { blogId, deleted: false },
      {
        $set: { updatedAt: new Date(), ...blogData },
      }
    );
    return response;
  };

  const deleteBlogById = async (blogId: string) => {
    const response = await BlogModel.updateOne(
      { blogId, deleted: false },
      {
        $set: { deleted: true, updatedAt: new Date() },
      }
    );
    return response;
  };

  const recoverDeletedBlogById = async (blogId: string) => {
    const response = await BlogModel.updateOne(
      { blogId, deleted: true },
      {
        $set: { deleted: false, updatedAt: new Date() },
      }
    );
    return response;
  };

  const getDeleteBlog = async (userId: string, blogId: string) => {
    const response = await BlogModel.findOne({
      author: userId,
      blogId,
      deleted: true,
    });
    return response;
  };

  const getAllDeletedBlogs = async (userId: string) => {
    const response = await BlogModel.find({
      author: userId,
      deleted: true,
    }).sort({ updatedAt: -1 });
    return response;
  };

  const updateBodyIndex = async (
    blogId: string,
    index: number,
    bodyData: []
  ) => {
    const response = await BlogModel.updateOne(
      { blogId, deleted: false },
      {
        $set: {
          updatedAt: new Date(),
          [`body.${index}`]: bodyData,
        },
      }
    );
    return response;
  };

  const updateAsNewBodyIndex = async (blogId: string, bodyData: []) => {
    const response = await BlogModel.updateOne(
      { blogId, deleted: false },
      {
        $push: {
          updatedAt: new Date(),
          body: bodyData,
        },
      }
    );
    return response;
  };

  const changeVisiblity = async (
    blogId: string,
    visibility: "public" | "private"
  ) => {
    const response = await BlogModel.updateOne(
      { blogId, deleted: false },
      {
        $set: {
          updatedAt: new Date(),
          published: visibility === "public",
        },
      }
    );
    return response;
  };

  const getAllBlogsDisplayWithUidWithPrivate = async (userId: string) => {
    const response = await BlogModel.aggregate([
      {
        $match: {
          author: userId,
          deleted: false,
        },
      },
      {
        $group: {
          _id: "$blogId",
          blogId: { $first: "$blogId" },
          title: { $first: "$title" },
          subtitle: { $first: "$subtitle" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          published: { $first: "$published" },
          bannerImgURL: { $first: "$bannerImgURL" },
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    return response;
  };

  const getAllBlogsDisplayWithUid = async (userId: string) => {
    const response = await BlogModel.aggregate([
      {
        $match: {
          author: userId,
          published: true,
          deleted: false,
        },
      },
      {
        $group: {
          _id: "$blogId",
          blogId: { $first: "$blogId" },
          title: { $first: "$title" },
          subtitle: { $first: "$subtitle" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          published: { $first: "$published" },
          bannerImgURL: { $first: "$bannerImgURL" },
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    return response;
  };

  const getAllPublicBlogs = async () => {
    const response = await BlogModel.find({ deleted: false, published: true });
    return response;
  };

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlogById,
    updateBodyIndex,
    updateAsNewBodyIndex,
    changeVisiblity,
    getAllBlogsDisplayWithUidWithPrivate,
    getAllBlogsDisplayWithUid,
    recoverDeletedBlogById,
    getAllDeletedBlogs,
    getDeleteBlog,
    getAllPublicBlogs,
  };
};

type blogRepositoryImpl = ReturnType<typeof blogRepositoryImpl>;
export default blogRepositoryImpl;
