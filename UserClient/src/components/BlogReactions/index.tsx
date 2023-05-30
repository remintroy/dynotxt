import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconThumbDownFilled, IconThumbUpFilled } from "@tabler/icons-react";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import {
  useDeleteBlogDislikeMutation,
  useDeleteBlogLikeMutation,
  useGetBlogReactionStatusQuery,
  usePostBlogDislikeMutation,
  usePostBlogLikeMutation,
} from "../../lib/api/blogApi";
import { nprogress } from "@mantine/nprogress";

const BlogReactionsComponent = ({ blogId }: { blogId?: string }) => {
  const { data } = useGetBlogReactionStatusQuery(blogId);

  const [addLikeApi] = usePostBlogLikeMutation();
  const [addDisLikeApi] = usePostBlogDislikeMutation();
  const [removeLikeApi] = useDeleteBlogLikeMutation();
  const [removeDislikeApi] = useDeleteBlogDislikeMutation();

  const changeStatus = async (statusApi: any) => {
    nprogress.start();
    nprogress.set(5);
    await statusApi(blogId);
    nprogress.complete();
  };

  return (
    <Flex align={"center"} py={10} gap={10}>
      <Flex align={"center"} justify={"center"} direction={"column"}>
        {data?.status == "LIKED" ? (
          <ActionIcon onClick={() => changeStatus(removeLikeApi)}>
            <IconThumbUpFilled />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => changeStatus(addLikeApi)}>
            <IconThumbUp />
          </ActionIcon>
        )}
        <Text fz={"sm"} color="dimmed">
          {data?.likes ?? 0} Likes
        </Text>
      </Flex>
      <Flex align={"center"} justify={"center"} direction={"column"}>
        {data?.status == "DISLIKED" ? (
          <ActionIcon onClick={() => changeStatus(removeDislikeApi)}>
            <IconThumbDownFilled />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => changeStatus(addDisLikeApi)}>
            <IconThumbDown />
          </ActionIcon>
        )}
        <Text fz={"sm"} color="dimmed">
          {data?.dislikes ?? 0} dislikes
        </Text>
      </Flex>
      {/* <Flex align={"center"} justify={"center"} direction={"column"}>
        <ActionIcon>
          <IconBookmark />
        </ActionIcon>
        <Text fz={"sm"} color="dimmed">
          -
        </Text>
      </Flex> */}
    </Flex>
  );
};

export default BlogReactionsComponent;
