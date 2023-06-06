import { Box, Flex, Text, Transition } from "@mantine/core";
import useNotificationsHook from "../../../hooks/useNotifications";
import { EmailVerifiedNotification, NewBlogNotification, NewFollowNotification, NewLoginNotification } from "../../../components/Notifications";
import { useEffect, useState } from "react";

const NotificationsTabPage = () => {
  const notificationsData = useNotificationsHook();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Transition mounted={mounted} transition="fade" duration={300} timingFunction="ease">
        {(styles) => (
          <Box style={styles} p={10}>
            <Text fz={"xl"} fw={"bold"} my={10} py={10}>
              Notifications
            </Text>
            <Flex direction={"column"} gap={15} mt={20}>
              {notificationsData?.map((notification) => {
                if (notification.noti_type == "new_blog") return <NewBlogNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "new_login") return <NewLoginNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "new_follow") return <NewFollowNotification key={notification?._id} data={notification} />;
                if (notification.noti_type == "email_verified") return <EmailVerifiedNotification key={notification?._id} data={notification} />;
                else return <div key={notification?._id}>-</div>;
              })}
            </Flex>
          </Box>
        )}
      </Transition>
    </>
  );
};

export default NotificationsTabPage;
