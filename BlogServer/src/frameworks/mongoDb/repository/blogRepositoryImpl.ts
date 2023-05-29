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
        $set: { trashed: false, published: false },
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

  const getAllDeletedBlogs = async (userId: string, page: number) => {
    const aggrigate = BlogModel.aggregate([
      { $match: { author: userId, trashed: true } },
      {
        $project: {
          disabled: 1,
          blogId: 1,
          title: 1,
          _id: 0,
          subtitle: 1,
          createdAt: 1,
          updatedAt: 1,
          bannerImgURL: 1,
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    const paginatedValue = await BlogModel.aggregatePaginate(aggrigate, {
      page: page || 1,
      limit: 12,
    });

    return paginatedValue;
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
    const aggrigate = BlogModel.aggregate([
      { $match: { author: userId, trashed: false } },
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
        $lookup: {
          from: "reactions",
          localField: "blogId",
          foreignField: "blogId",
          as: "reactions",
          pipeline: [
            {
              $facet: {
                likes: [
                  { $match: { value: "like" } },
                  { $group: { _id: "$blogId", count: { $sum: 1 } } },
                  { $project: { _id: 0 } },
                ],
                dislikes: [
                  { $match: { value: "dislike" } },
                  { $group: { _id: "$blogId", count: { $sum: 1 } } },
                  { $project: { _id: 0 } },
                ],
              },
            },
            {
              $project: {
                likes: { $arrayElemAt: ["$likes.count", 0] },
                dislikes: { $arrayElemAt: ["$dislikes.count", 0] },
              },
            },
          ],
        },
      },
      { $addFields: { reactions: { $arrayElemAt: ["$reactions", 0] } } },
      { $addFields: { "reactions.likes": { $ifNull: ["$reactions.likes", 0] } } },
      { $addFields: { "reactions.dislikes": { $ifNull: ["$reactions.dislikes", 0] } } },
      {
        $lookup: {
          from: "comments",
          localField: "blogId",
          foreignField: "blogId",
          as: "comments",
          pipeline: [{ $project: { count: { $size: "$comment" } } }, { $project: { _id: 0 } }],
        },
      },
      { $addFields: { comments: { $arrayElemAt: ["$comments.count", 0] } } },
      { $addFields: { comments: { $ifNull: ["$comments", 0] } } },
      {
        $lookup: {
          from: "views",
          localField: "blogId",
          foreignField: "blogId",
          as: "views",
          pipeline: [{ $group: { _id: "$blogId", count: { $sum: 1 } } }, { $project: { _id: 0 } }],
        },
      },
      { $addFields: { views: { $arrayElemAt: ["$views.count", 0] } } },
      { $addFields: { views: { $ifNull: ["$views", 0] } } },
      { $sort: { updatedAt: -1 } },
      { $project: { _id: 0 } },
    ]);

    const paginatedValue = await BlogModel.aggregatePaginate(aggrigate, {
      page: page || 1,
      limit: 12,
    });

    return paginatedValue;
  };

  const getAllBlogsDisplayWithUid = async (userId: string, page: number) => {
    const aggrigate = BlogModel.aggregate([
      { $match: { author: userId, trashed: false, published: true } },
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
        $lookup: {
          from: "reactions",
          localField: "blogId",
          foreignField: "blogId",
          as: "reactions",
          pipeline: [
            {
              $facet: {
                likes: [
                  { $match: { value: "like" } },
                  { $group: { _id: "$blogId", count: { $sum: 1 } } },
                  { $project: { _id: 0 } },
                ],
                dislikes: [
                  { $match: { value: "dislike" } },
                  { $group: { _id: "$blogId", count: { $sum: 1 } } },
                  { $project: { _id: 0 } },
                ],
              },
            },
            {
              $project: {
                likes: { $arrayElemAt: ["$likes.count", 0] },
                dislikes: { $arrayElemAt: ["$dislikes.count", 0] },
              },
            },
          ],
        },
      },
      { $addFields: { reactions: { $arrayElemAt: ["$reactions", 0] } } },
      { $addFields: { "reactions.likes": { $ifNull: ["$reactions.likes", 0] } } },
      { $addFields: { "reactions.dislikes": { $ifNull: ["$reactions.dislikes", 0] } } },
      {
        $lookup: {
          from: "comments",
          localField: "blogId",
          foreignField: "blogId",
          as: "comments",
          pipeline: [{ $project: { count: { $size: "$comment" } } }, { $project: { _id: 0 } }],
        },
      },
      { $addFields: { comments: { $arrayElemAt: ["$comments.count", 0] } } },
      { $addFields: { comments: { $ifNull: ["$comments", 0] } } },
      {
        $lookup: {
          from: "views",
          localField: "blogId",
          foreignField: "blogId",
          as: "views",
          pipeline: [{ $group: { _id: "$blogId", count: { $sum: 1 } } }, { $project: { _id: 0 } }],
        },
      },
      { $addFields: { views: { $arrayElemAt: ["$views.count", 0] } } },
      { $addFields: { views: { $ifNull: ["$views", 0] } } },
      { $sort: { updatedAt: -1 } },
      { $project: { _id: 0 } },
    ]);

    const paginatedValue = await BlogModel.aggregatePaginate(aggrigate, {
      page: page || 1,
      limit: 12,
    });

    return paginatedValue;
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

  const viewsInLastNDays = async (blogId: string, lastNDays: number) => {};

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
