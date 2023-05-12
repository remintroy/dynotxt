import { useState } from "react";
import { useAppSelector } from "../../../lib/redux/hooks";
import { useDeleteCommentMutation, useGetCommentsQuery, usePostNewCommentMutation } from "../../../lib/api/blogApi";
import { ActionIcon, Avatar, Box, Button, Flex, Grid, Input, Loader, Menu, Paper, Text } from "@mantine/core";
import { IconDotsVertical, IconSend } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useGetUserDataWithUidQuery } from "../../../lib/api/authApi";

const CommentComponent = ({ data, skip, blogId }: { data: any; skip?: boolean; blogId: string | undefined }) => {
  const user = useAppSelector((state) => state.user.data);
  const { data: userData } = useGetUserDataWithUidQuery(data.uid, { skip });

  const [deleteCommentApi] = useDeleteCommentMutation();

  const deleteComment = async (id: string) => {
    try {
      await deleteCommentApi({ blogId, commentId: id });
    } catch (error) {
      console.log(error);
    }
    //   const { data } = await blogBackend.delete(`/comment/${blogId}/${id}`, {
  };

  return (
    <div key={`${data?._id}`} className="commentUi">
      <Flex align={"start"} gap={20} justify={"space-between"} mt={20}>
        <div style={{ height: "100%", position: "relative" }}>
          <Avatar src={userData?.photoURL} radius={"xl"} sx={{ position: "sticky", top: 0 }} />
        </div>
        <div style={{ width: "100%" }}>
          <Flex justify={"space-between"}>
            <div>
              <Text>{userData?.name}</Text>
              <Text size={"sm"} color="dimmed">
                {new Date(data?.createdAt).toDateString()}
              </Text>
            </div>
            {user?.uid == data?.uid && (
              <Menu trigger="hover" shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size={"20px"} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Comments</Menu.Label>
                  <Menu.Item onClick={() => deleteComment(data?._id)} icon={<IconTrash size={14} />} color="red">
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>
          <Paper withBorder p="md" mt={10}>
            {data?.message}
          </Paper>
        </div>
      </Flex>
    </div>
  );
};

const CommentSectionComponent = ({ blogId, skip }: { blogId: string | undefined; skip?: boolean }) => {
  const { data, isLoading, isFetching } = useGetCommentsQuery(blogId, { skip });
  const [uploadNewComment] = usePostNewCommentMutation();

  const user = useAppSelector((state) => state.user.data);
  const [comment, setComment] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const postNewComment = async () => {
    try {
      if (comment.trim().length > 0) {
        setUploadLoading(true);
        await uploadNewComment({ blogId, data: comment }).unwrap();
        setUploadLoading(false);
        setComment("");
      }
    } catch (error) {
      setUploadLoading(false);
    }
  };

  return (
    <div className="CommentSectionComponent">
      <h2>Comments</h2>

      {user && (
        <>
          <Box className="commentInput">
            <Text fw="bold">Post your comment</Text>
            <Text color="dimmed">{data?.length ? data?.length : 0} comments</Text>
            <Grid w="100%" mt="xs">
              <Grid.Col span={11}>
                {" "}
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your comments here"
                />
              </Grid.Col>
              <Grid.Col span={1} display={"flex"} sx={{ alignItems: "center", justifyContent: "center" }}>
                <Button onClick={() => postNewComment()} variant="light">
                  {uploadLoading ? <Loader size={"sm"} /> : <IconSend size={"20px"} />}
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
          <br />
        </>
      )}

      {(isLoading || isFetching) && (
        <Flex align={"center"} justify={"center"}>
          <Loader />
        </Flex>
      )}

      {data
        ?.slice(0)
        ?.reverse()
        .map((comment: any) => {
          return <CommentComponent key={comment?._id} data={comment} skip={skip} blogId={blogId} />;
        })}

      <br />
      <br />
    </div>
  );
};

export default CommentSectionComponent;
