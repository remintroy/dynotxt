import { ActionIcon, Card, Flex, Indicator, ScrollArea, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";
import { useState } from "react";
import useNotificationsHook from "../../hooks/useNotifications";
import { EmailVerifiedNotification, NewBlogNotification, NewFollowNotification, NewLoginNotification } from "../Notifications";

const NotificationPopupComponent = () => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const notificationsData = useNotificationsHook();

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
            <Flex direction={"column"} gap={15} mt={20}>
              {notificationsData?.map((notification) => {
                if (notification.noti_type == "new_blog") return <NewBlogNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "new_login") return <NewLoginNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "new_follow") return <NewFollowNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "email_verified") return <EmailVerifiedNotification key={notification?._id} data={notification} />;
                else return <div key={notification?._id}>-</div>;
              })}
            </Flex>
          </ScrollArea>
        </Card>
      )}
    </>
  );
};

export default NotificationPopupComponent;
