import { ActionIcon, Avatar, Button, Flex, Grid, Input, Loader, Menu, Paper, Text } from "@mantine/core";
import "./style.scss";
import { IconDotsVertical, IconMenu, IconSend, IconTrash } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { authBackend, blogBackend } from "../../configs/axios";
import { notifications } from "@mantine/notifications";
import { pushUser } from "../../redux/userDataSlice";

const CommentSectionComponent = ({ blogId, userId }: { blogId: string | undefined; userId: string | undefined }) => {
  const user = useAppSelector((state) => state.user.data);
  const [comment, setComment] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  const getCommentsDataFromServer = async () => {
    try {
      const { data } = await blogBackend.get(`/comment/${blogId}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setCommentsData(data?.reverse());
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error fetching comments",
        message:
          "There was an error fetching comments from this blog. This issue can be solved by reloding pager or try after some time.",
      });
    }
  };

  const postNewComment = async () => {
    if (comment.trim().length > 0) {
      setUploadLoading(true);
      try {
        const { data } = await blogBackend.put(
          `/comment/${blogId}`,
          { message: comment },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } }
        );
        setUploadLoading(false);
        getCommentsDataFromServer();
        setComment("");
      } catch (error) {
        setUploadLoading(false);
        notifications.show({
          color: "red",
          title: "Error posting comments",
          message:
            "There was an error while adding new comments for this blog. This issue can be solved by reloding pager or try after some time.",
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCommentsDataFromServer();
  }, []);

  const userList: any = useAppSelector((state) => state.userData.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    commentsData.map(async (comment: any) => {
      if (!userList[comment?.uid]) {
        const { data } = await authBackend.get(`/user/${comment.uid}`);
        dispatch(pushUser({ [`${comment?.uid}`]: data }));
      }
    });
  }, [commentsData]);

  const deleteComment = async (id: string) => {
    try {
      const { data } = await blogBackend.delete(`/comment/${blogId}/${id}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      getCommentsDataFromServer();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error deleting comments",
        message:
          "There was an error while deleting comments for this blog. This issue can be solved by reloding pager or try after some time.",
      });
      console.log(error);
    }
  };

  return (
    <div className="CommentSectionComponent">
      <h2>Comments</h2>

      {user && (
        <>
          <Paper className="commentInput">
            <Text fw="bold">Post your comment</Text>
            <Grid w="100%" mt="xs">
              <Grid.Col span={11}>
                {" "}
                <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Type your comments here" />
              </Grid.Col>
              <Grid.Col span={1} display={"flex"} sx={{ alignItems: "center", justifyContent: "center" }}>
                <Button onClick={() => postNewComment()} variant="light">
                  {uploadLoading ? <Loader size={"sm"} /> : <IconSend size={"20px"} />}
                </Button>
              </Grid.Col>
            </Grid>
          </Paper>
          <br />
        </>
      )}

      {commentsData.map((comment: any) => {
        return (
          <div key={`${comment?._id}`} className="commentUi">
            <Flex align={"start"} gap={20} justify={"space-between"} mt={20}>
              <div style={{ height: "100%", position: "relative" }}>
                <Avatar src={userList[comment?.uid]?.photoURL} radius={"xl"} sx={{ position: "sticky", top: 0 }} />
              </div>
              <div style={{ width: "100%" }}>
                <Flex justify={"space-between"}>
                  <div>
                    <Text>{userList[comment?.uid]?.name}</Text>
                    <Text size={"sm"} color="dimmed">
                      {new Date(comment?.createdAt).toDateString()}
                    </Text>
                  </div>
                  {user?.uid == comment?.uid && (
                    <Menu trigger="hover" shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon>
                          <IconDotsVertical size={"20px"} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Comments</Menu.Label>
                        <Menu.Item onClick={() => deleteComment(comment?._id)} icon={<IconTrash size={14} />} color="red">
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </Flex>
                <Paper withBorder p="md" mt={10}>
                  {comment?.message}
                </Paper>
              </div>
            </Flex>
          </div>
        );
      })}

      <br />
      <br />
    </div>
  );
};

export default CommentSectionComponent;
