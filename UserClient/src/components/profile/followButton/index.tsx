import { useState } from "react";
import {
  useDeleteFollowUserMutation,
  useGetFollowUserQuery,
  usePostFollowUserMutation,
} from "../../../lib/api/authApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import { Button, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const FollowButtonComponent = ({ userId }: { userId: string }) => {
  const user = useAppSelector((state) => state.user.data);
  const { data, isLoading, isFetching } = useGetFollowUserQuery(userId, { skip: !user });
  const [followUserApi] = usePostFollowUserMutation();
  const [unfollowApi] = useDeleteFollowUserMutation();
  const [followLoading, setFollowLoading] = useState(false);

  const followUserHandler = async () => {
    setFollowLoading(true);
    try {
      await followUserApi(userId).unwrap();
      setFollowLoading(false);
    } catch (error) {
      setFollowLoading(false);
      notifications.show({
        color: "red",
        title: "Faild to follow",
        message: "There was an error following user re-try after some time",
      });
    }
  };

  const unFollowHandler = async () => {
    setFollowLoading(true);
    try {
      await unfollowApi(userId).unwrap();
      setFollowLoading(false);
    } catch (error) {
      setFollowLoading(false);
      notifications.show({
        color: "red",
        title: "Faild to unfollow",
        message: "There was an error unfollowing user re-try after some time",
      });
    }
  };

  return (
    <>
      {user?.uid !== userId && (
        <>
          {data?.status && data?.status == "NOTFOLLOWING" && (
            <Button
              variant="outline"
              onClick={() => followUserHandler()}
              leftIcon={followLoading || isFetching || isLoading ? <Loader size="xs" /> : ""}
            >
              Follow
            </Button>
          )}
          {data?.status && data?.status == "FOLLOWED" && (
            <Button
              variant="outline"
              onClick={() => unFollowHandler()}
              leftIcon={followLoading || isFetching || isLoading ? <Loader size="xs" /> : ""}
            >
              Unfollow
            </Button>
          )}
          {data?.status && data?.status == "FOLLOWREQ" && (
            <Button
              variant="outline"
              onClick={() => unFollowHandler()}
              leftIcon={followLoading || isFetching || isLoading ? <Loader size="xs" /> : ""}
            >
              Requested
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default FollowButtonComponent;
