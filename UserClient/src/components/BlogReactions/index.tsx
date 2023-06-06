import { ActionIcon, Button, CopyButton, Flex, Modal, Text } from "@mantine/core";
import { IconBrandWhatsapp, IconShare, IconThumbDownFilled, IconThumbUpFilled } from "@tabler/icons-react";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import {
  useDeleteBlogDislikeMutation,
  useDeleteBlogLikeMutation,
  useGetBlogReactionStatusQuery,
  usePostBlogDislikeMutation,
  usePostBlogLikeMutation,
} from "../../lib/api/blogApi";
import { nprogress } from "@mantine/nprogress";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  const [openShare, setOpenShare] = useState(false);

  const handleShare = () => {
    console.log(blogId);
    setOpenShare(true);
  };

  return (
    <>
      <Modal centered title="Share your blog" onClose={() => setOpenShare(false)} opened={openShare}>
        <Flex gap={10}>
          <Link to={`https://wa.me/?text=https://dynotxt.com/blog/${blogId}`} data-action="share/whatsapp/share">
            <Button color="green" leftIcon={<IconBrandWhatsapp />}>
              Whatsapp
            </Button>
          </Link>
          <CopyButton value={`https://wa.me/?text=https://dynotxt.com/blog/${blogId}`}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {copied ? "Copied url" : "Copy url"}
              </Button>
            )}
          </CopyButton>
        </Flex>
      </Modal>
      <Flex align={"center"} gap={10}>
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
        <Flex align={"center"} justify={"center"} direction={"column"}>
          <ActionIcon onClick={handleShare}>
            <IconShare />
          </ActionIcon>
          <Text fz={"sm"} color="dimmed">
            Share
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default BlogReactionsComponent;
