export default function buildMakeBlog({ Id, validator }) {
  return function makeComment({
    author,
    published = false,
    blogId,
    createdAt = new Date(),
    updatedAt = new Date(),
    data,
  }) {};
}
