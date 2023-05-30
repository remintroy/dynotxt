import { useState } from "react";
import { useAppSelector } from "../../lib/redux/hooks";
import { useDeleteCommentMutation, useGetCommentsQuery, usePostNewCommentMutation } from "../../lib/api/blogApi";
import { ActionIcon, Avatar, Button, Flex, Grid, Input, Loader, Menu, Paper, Text } from "@mantine/core";
import { IconChevronRight, IconChevronUp, IconDotsVertical, IconSend } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useGetUserDataWithUidQuery } from "../../lib/api/authApi";
import { modals } from "@mantine/modals";
import useUserDataHook from "../../hooks/useUserData";

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
  };

  const deleteCommentConfirmation = (id: string) =>
    modals.openConfirmModal({
      centered: true,
      confirmProps: { color: "red" },
      title: "Are you sure you want to delete this comment?",
      children: <Text size="sm">This will remove your comment from this blog permenantly and you cannot recover it.</Text>,
      labels: { confirm: "Delete comment", cancel: "Cancel" },
      onCancel: () => "",
      onConfirm: () => deleteComment(id),
    });

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
                  <Menu.Item onClick={() => deleteCommentConfirmation(data?._id)} icon={<IconTrash size={14} />} color="red">
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
  const user = useUserDataHook();
  const [comment, setComment] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

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
    <Paper withBorder p={25} px={30} mt={20} sx={{ position: "relative" }}>
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"end"} gap={20}>
          <h2 style={{ padding: 0, margin: 0 }}>Comments</h2>
        </Flex>
      </Flex>
      <Text color="dimmed">{data?.length ? data?.length : 0} comments</Text>
      {user && (
        <Grid mt="xs" sx={{ position: "sticky", bottom: 0 }}>
          <Grid.Col span={11}>
            {" "}
            <Input
              value={comment}
              onKeyUp={(e) => {
                if (e.key == "Enter") postNewComment();
              }}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comments here"
            />
          </Grid.Col>
          <Grid.Col span={1} display={"flex"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Button onClick={() => postNewComment()} variant="default">
              {uploadLoading ? <Loader size={"sm"} /> : <IconSend size={"20px"} />}
            </Button>
          </Grid.Col>
        </Grid>
      )}

      <br />

      {(isLoading || isFetching) && (
        <Flex>
          <Loader />
        </Flex>
      )}

      {data
        ?.slice(0)
        ?.reverse()
        ?.slice(0, !showAllComments ? 1 : data?.length ?? -1)
        ?.map((comment: any) => {
          return <CommentComponent key={comment?._id} data={comment} skip={skip} blogId={blogId} />;
        })}

      <Flex justify={"end"} mt={25}>
        <Button variant="default" rightIcon={!showAllComments ? <IconChevronRight /> : <IconChevronUp />} onClick={() => setShowAllComments((pre) => !pre)}>
          {showAllComments ? "Hide all comments" : "Show all comments"}
        </Button>
      </Flex>
    </Paper>
  );
};

export default CommentSectionComponent;
