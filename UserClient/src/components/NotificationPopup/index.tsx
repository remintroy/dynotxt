import { ActionIcon, Avatar, Box, Button, Card, Flex, Indicator, ScrollArea, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconAlertCircle, IconBell, IconUser } from "@tabler/icons-react";
import { IconNotification } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useNotificationsHook from "../../hooks/useNotifications";

const NotificationPopupComponent = () => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const notificationsData = useNotificationsHook();

  console.log(notificationsData);

  const NewBlogNotification = ({ data: notificationData }: any) => {
    return (
      <Flex gap={10} align={"center"} justify={"space-between"}>
        <Flex gap={10} align={"start"}>
          <Avatar src={notificationData.data?.bannerImgURL} alt="Blog image" color="green">
            <IconNotification />
          </Avatar>
          <Box>
            <Text sx={{ lineHeight: 1.5 }} lineClamp={1} color={notificationData?.readed ? "dimmed" : ""}>
              {notificationData.data?.title}
            </Text>
            <Flex>
              <Text sx={{ lineHeight: 1.3 }} lineClamp={1} color="dimmed" fz={"xs"}>
                {notificationData.data?.authorName} &nbsp; . &nbsp;
              </Text>
              <Text sx={{ lineHeight: 1.3 }} w={130} lineClamp={1} color="dimmed" fz={"xs"}>
                {new Date(notificationData?.createdAt).toDateString()}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Link
          to={`/blog/${notificationData.data?.blogId}`}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Button variant="light" size="xs">
            View
          </Button>
        </Link>
      </Flex>
    );
  };

  const NewLoginNotification = ({ data: notificationData }: any) => {
    return (
      <Flex gap={10} align={"center"} justify={"space-between"}>
        <Flex gap={10} align={"start"}>
          <Avatar src={notificationData.data?.bannerImgURL} alt="Login Icon" color="blue">
            <IconAlertCircle />
          </Avatar>
          <Box>
            <Text sx={{ lineHeight: 1.5 }} lineClamp={1} color={notificationData?.readed ? "dimmed" : ""}>
              New login success
            </Text>
            <Flex>
              <Text sx={{ lineHeight: 1.3 }} w={130} lineClamp={1} color="dimmed" fz={"xs"}>
                {new Date(notificationData?.createdAt).toDateString()}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    );
  };

  const NewFollowNotification = ({ data: notificationData }: any) => {
    return (
      <Flex gap={10} align={"center"} justify={"space-between"}>
        <Flex gap={10} align={"start"}>
          <Avatar src={notificationData.data?.photoURL} alt="User icon" color="orange">
            <IconUser />
          </Avatar>
          <Box>
            <Text sx={{ lineHeight: 1.5 }} lineClamp={1} color={notificationData?.readed ? "dimmed" : ""}>
              {notificationData.data?.name} started following you
            </Text>
            <Flex>
              <Text sx={{ lineHeight: 1.3 }} w={130} lineClamp={1} color="dimmed" fz={"xs"}>
                {new Date(notificationData?.createdAt).toDateString()}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Link
          to={`/profile/${notificationData.data?.uid}`}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Button variant="light" size="xs">
            View
          </Button>
        </Link>
      </Flex>
    );
  };

  return (
    <>
      {notificationsData?.filter((e) => !e.readed)?.length > 0 ? (
        <ActionIcon onClick={() => setOpen(true)} aria-label="Notification button">
          <Indicator>
            <IconBell />
          </Indicator>
        </ActionIcon>
      ) : (
        <ActionIcon onClick={() => setOpen(true)} aria-label="Notification button">
          <IconBell />
        </ActionIcon>
      )}
      {open && (
        <Card shadow="lg" ref={ref} withBorder sx={{ position: "absolute", zIndex: 100, top: 78, right: 40, width: 400 }}>
          <Flex align={"center"} justify={"space-between"} mb={10}>
            <Text fw={"bold"}>Notifications</Text>
            <Text fz="sm" color="dimmed" fw={"bold"}>
              {notificationsData?.filter((e) => !e.readed).length ?? 0} new
            </Text>
          </Flex>
          <ScrollArea h={400} offsetScrollbars>
            <Flex direction={"column"} gap={15}>
              {notificationsData?.map((notification) => {
                if (notification.noti_type == "new_blog") return <NewBlogNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "new_login") return <NewLoginNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "new_follow") return <NewFollowNotification key={notification?._id} data={notification} />;
                else return <>-</>;
              })}
            </Flex>
          </ScrollArea>
        </Card>
      )}
    </>
  );
};

export default NotificationPopupComponent;
