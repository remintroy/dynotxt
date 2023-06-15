import { Avatar, Box, Button, Flex, Text } from "@mantine/core";
import { IconNotification, IconRecordMail } from "@tabler/icons-react";
import { IconAlertCircle } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const NewBlogNotification = ({ data: notificationData, setOpen }: any) => {
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
          setOpen && setOpen(false);
        }}
      >
        <Button variant="light" size="xs">
          View
        </Button>
      </Link>
    </Flex>
  );
};

export const NewLoginNotification = ({ data: notificationData }: any) => {
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

export const EmailVerifiedNotification = ({ data: notificationData }: any) => {
  return (
    <Flex gap={10} align={"center"} justify={"space-between"}>
      <Flex gap={10} align={"start"}>
        <Avatar src={notificationData.data?.bannerImgURL} alt="Login Icon" color="blue">
          <IconRecordMail />
        </Avatar>
        <Box>
          <Text sx={{ lineHeight: 1.5 }} lineClamp={1} color={notificationData?.readed ? "dimmed" : ""}>
            You email is successfully verified
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

export const NewFollowNotification = ({ data: notificationData, setOpen }: any) => {
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
          setOpen && setOpen(false);
        }}
      >
        <Button variant="light" size="xs">
          View
        </Button>
      </Link>
    </Flex>
  );
};
