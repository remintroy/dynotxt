import { Blog } from "../../../entities/blog";
import BlogModel from "../models/blog";

const blogRepositoryImpl = () => {
  const commonPageLimit = 10;

  const getBlogById = async (blogId: string) => {
    const response = await BlogModel.aggregate([
      {
        $match: { blogId, trashed: false, disabled: false },
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
        $project: {
          _id: 0,
          __v: 0,
          version: 0,
          trashedAt: 0,
          trashed: 0,
          deleted: 0,
        },
      },
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
    ]);
    return response[0];
  };

  const getBlogByIdPrivate = async (blogId: string, authorId: string) => {
    const response = await BlogModel.aggregate([
      {
        $match: { blogId, author: authorId },
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
        $project: {
          _id: 0,
          __v: 0,
          version: 0,
          trashedAt: 0,
          trashed: 0,
          deleted: 0,
        },
      },
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
    ]);
    return response[0];
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
      limit: commonPageLimit,
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

  const getAllBlogsDisplayWithUidWithPrivate = async (
    userId: string,
    {
      sort,
      page,
      filter,
    }: {
      sort?: { key: "date" | "views" | "likes" | "updated"; order: -1 | 1 };
      page?: number;
      filter?: ["public" | "private" | "disabled"];
    }
  ) => {
    let sortObj: any;

    switch (sort?.key) {
      case "date": {
        sortObj = { $sort: { createdAt: Number(sort?.order) || -1 } };
        break;
      }
      case "likes": {
        sortObj = { $sort: { "reactions.likes": Number(sort?.order) || -1 } };
        break;
      }
      case "views": {
        sortObj = { $sort: { views: Number(sort?.order) || -1 } };
        break;
      }
      case "updated": {
        sortObj = { $sort: { updatedAt: Number(sort?.order) || -1 } };
        break;
      }
      default: {
        sortObj = { $sort: { createdAt: Number(sort?.order) || -1 } };
      }
    }

    const filterObj: { $match: Blog } = { $match: { author: userId, trashed: false } };

    if (filter?.includes("public")) filterObj.$match.published = true;
    if (filter?.includes("disabled")) filterObj.$match.disabled = true;
    if (filter?.includes("private")) filterObj.$match.published = false;

    const aggrigate = BlogModel.aggregate([
      filterObj,
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
          category: { $first: "$category" },
          author: { $first: "$author" },
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
      sortObj,
      { $project: { _id: 0 } },
    ]);

    const paginatedValue = await BlogModel.aggregatePaginate(aggrigate, {
      page: Number(page) || 1,
      limit: commonPageLimit,
    });

    return paginatedValue;
  };

  const getAllBlogsDisplayWithUid = async (userId: string, { page }: { page: number }) => {
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
          category: { $first: "$category" },
          bannerImgURL: { $first: "$bannerImgURL" },
          author: { $first: "$author" },
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
      limit: commonPageLimit,
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

  const getAllPublicBlogs = async (page: number) => {
    const aggrigate = BlogModel.aggregate([
      {
        $match: {
          trashed: false,
          published: true,
          disabled: false,
        },
      },
    ]);
    return await BlogModel.aggregatePaginate(aggrigate, {
      page,
      limit: commonPageLimit,
    });
  };

  const softDeleteBlogs = async (blogId: string, author: string) => {
    const blogData = await BlogModel.findOne({ blogId, trashed: true, author });
    if (!blogData) return false;
    blogData.author = blogData.author + "_deleted";
    blogData.blogId = blogData.blogId + "_deleted";
    blogData.deletedAt = new Date();
    return await blogData.save();
  };

  const searchBlogs = async (searchQuery: string, page: number) => {
    searchQuery = searchQuery?.trim()?.toLocaleLowerCase();
    const regex = new RegExp(searchQuery, "ig");
    try {
      const resp_a = BlogModel.aggregate([
        {
          $match: {
            published: true,
            trashed: false,
            disabled: false,
            $text: { $search: searchQuery },
          },
        },
        {
          $project: {
            blogId: 1,
            title: 1,
            subtitle: 1,
            createdAt: 1,
            updatedAt: 1,
            bannerImgURL: 1,
            category: 1,
            author: 1,
            _id: 0,
          },
        },
      ]);
      const resp_A = await BlogModel.aggregatePaginate(resp_a, { page, limit: commonPageLimit });
      if (resp_A.totalDocs > 0) return resp_A;
      const resp_b = BlogModel.aggregate([
        {
          $match: {
            published: true,
            trashed: false,
            disabled: false,
            $or: [{ title: { $regex: regex } }, { subtitle: { $regex: regex } }, { category: regex }],
          },
        },
        {
          $project: {
            blogId: 1,
            title: 1,
            subtitle: 1,
            createdAt: 1,
            updatedAt: 1,
            category: 1,
            bannerImgURL: 1,
            author: 1,
            _id: 0,
          },
        },
      ]);
      return await BlogModel.aggregatePaginate(resp_b, { page, limit: commonPageLimit });
    } catch (error) {
      console.log(error);
    }
  };

  const searchBlogCategoryTags = async (searchQuery: string, page?: number) => {
    const regex = new RegExp(searchQuery, "ig");
    let response = BlogModel.aggregate([
      {
        $match: {
          category: {
            $regex: regex,
          },
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $project: {
          _id: 0,
          value: "$_id",
        },
      },
      {
        $match: {
          value: {
            $regex: regex,
          },
        },
      },
    ]);

    let output = await BlogModel.aggregatePaginate(response, { page: Number(page) || 1, limit: commonPageLimit });
    output.docs = output.docs.map((value) => value.value);
    return output;
  };

  const getBlogsWithCategoryList = async (categoryList: string[], { page }: { page?: number }) => {
    try {
      const response = BlogModel.aggregate([
        {
          $match: {
            category: {
              $in: Array.isArray(categoryList) ? categoryList : [],
            },
          },
        },
      ]);
      return BlogModel.aggregatePaginate(response, { page, limit: commonPageLimit });
    } catch (error) {
      console.log(error);
    }
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
    searchBlogs,
    searchBlogCategoryTags,
    getBlogsWithCategoryList,
  };
};

type blogRepositoryImpl = ReturnType<typeof blogRepositoryImpl>;
export default blogRepositoryImpl;
