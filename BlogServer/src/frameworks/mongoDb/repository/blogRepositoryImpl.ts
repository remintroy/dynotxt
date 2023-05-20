import { Blog } from "../../../entities/blog";
import BlogModel from "../models/blog";

const blogRepositoryImpl = () => {
  const getBlogById = async (blogId: string) => {
    return await BlogModel.findOne({ blogId, trashed: false, disabled: false });
  };

  const getBlogByIdPrivate = async (blogId: string, authorId: string) => {
    return await BlogModel.findOne({ blogId, author: authorId });
  };

  const getBlogByIdAdmin = async (blogId: string) => {
    return await BlogModel.findOne({ blogId });
  };

  const addNewBlog = async (blogData: Blog) => {
    return await new BlogModel(blogData).save();
  };

  const updateBlog = async (blogId: string, blogData: Blog) => {
    return await BlogModel.updateOne(
      { blogId, trashed: false, disabled: false },
      {
        $set: { updatedAt: new Date(), ...blogData },
      }
    );
  };

  const trashBlogById = async (blogId: string) => {
    return await BlogModel.updateOne(
      { blogId, trashed: false },
      {
        $set: { trashed: true, trashedAt: new Date() },
      }
    );
  };

  const recoverTrashedBlogById = async (blogId: string) => {
    return await BlogModel.updateOne(
      { blogId, trashed: true },
      {
        $set: { trashed: false },
      }
    );
  };

  const getDeleteBlog = async (userId: string, blogId: string) => {
    return await BlogModel.findOne({
      author: userId,
      blogId,
      trashed: true,
    });
  };

  const getAllDeletedBlogs = async (userId: string) => {
    return await BlogModel.find({
      author: userId,
      trashed: true,
    }).sort({ updatedAt: -1 });
  };

  const updateBodyIndex = async (blogId: string, index: number, bodyData: []) => {
    return await BlogModel.updateOne(
      { blogId, trashed: false, disabled: false },
      {
        $set: {
          updatedAt: new Date(),
          [`body.${index}`]: bodyData,
        },
      }
    );
  };

  const updateAsNewBodyIndex = async (blogId: string, bodyData: []) => {
    return await BlogModel.updateOne(
      { blogId, trashed: false, disabled: false },
      {
        $push: {
          updatedAt: new Date(),
          body: bodyData,
        },
      }
    );
  };

  const changeVisiblity = async (blogId: string, visibility: "public" | "private") => {
    return await BlogModel.updateOne(
      { blogId, trashed: false, disabled: false },
      {
        $set: {
          published: visibility === "public",
        },
      }
    );
  };

  const getAllBlogsDisplayWithUidWithPrivate = async (userId: string, page: number) => {
    const pipeline: any = [
      {
        $match: {
          author: userId,
          trashed: false,
        },
      },
      {
        $group: {
          _id: "$blogId",
          disabled: { $first: "$disabled" },
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
      {
        $project: {
          _id: 0,
        },
      },
    ];

    const aggrigate = BlogModel.aggregate(pipeline);

    const paginatedValue = await BlogModel.aggregatePaginate(aggrigate, {
      page: page || 1,
      limit: 12,
    });

    return paginatedValue;
  };

  const getAllBlogsDisplayWithUid = async (userId: string, page: number) => {
    const pipeline: any = [
      {
        $match: {
          author: userId,
          published: true,
          trashed: false,
          disabled: false,
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
      {
        $project: {
          _id: 0,
        },
      },
    ];

    const aggrigate = BlogModel.aggregate(pipeline);

    return await BlogModel.aggregatePaginate(aggrigate, { page: page || 1, limit: 12 });
  };

  const adminGetAllDisabledBlogs = async () => {
    return await BlogModel.aggregate([
      {
        $match: {
          disabled: true,
        },
      },
      {
        $lookup: {
          from: "flags",
          localField: "blogId",
          foreignField: "blogId",
          as: "flags",
          pipeline: [
            {
              $project: {
                createdAt: 1,
                blogId: 1,
                reason: 1,
                status: 1,
                userId: 1,
              },
            },
          ],
        },
      },
    ]);
  };

  const getAllPublicBlogs = async () => {
    return await BlogModel.find({ trashed: false, published: true, disabled: false });
  };

  const softDeleteBlogs = async (blogId: string, author: string) => {
    const blogData = await BlogModel.findOne({ blogId, trashed: true, author });
    if (!blogData) return false;
    blogData.author = blogData.author + "_deleted";
    blogData.blogId = blogData.blogId + "_deleted";
    blogData.deletedAt = new Date();
    return await blogData.save();
  };

  return {
    getBlogById,
    getBlogByIdPrivate,
    getBlogByIdAdmin,
    addNewBlog,
    updateBlog,
    trashBlogById,
    updateBodyIndex,
    updateAsNewBodyIndex,
    changeVisiblity,
    getAllBlogsDisplayWithUidWithPrivate,
    getAllBlogsDisplayWithUid,
    recoverTrashedBlogById,
    getAllDeletedBlogs,
    getDeleteBlog,
    adminGetAllDisabledBlogs,
    getAllPublicBlogs,
    softDeleteBlogs,
  };
};

type blogRepositoryImpl = ReturnType<typeof blogRepositoryImpl>;
export default blogRepositoryImpl;
