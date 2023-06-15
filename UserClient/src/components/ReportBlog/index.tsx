import { Alert, Button, Flex, Input, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { useState } from "react";
import { usePostBlogReportMutation } from "../../lib/api/blogApi";

const ReportBlogComponet = ({ blogId }: { blogId: string | undefined }) => {
  const ModalContent = () => {
    const [postReport] = usePostBlogReportMutation();
    const [reason, setReason] = useState("");
    const reportBlog = async () => await postReport({ blogId, message: reason }).unwrap();

    return (
      <>
        <Text size="sm">Please type the issue or reason for report.</Text>
        <Input value={reason} onChange={(e) => setReason(e.target.value)} mt={10} placeholder="Your issue with the blog" />
        <Flex justify={"end"} gap={10} mt={20}>
          <Button variant="default" onClick={() => modals.closeAll()}>
            Close
          </Button>
          <Button
            onClick={async () => {
              if (reason.split("").length > 1) {
                try {
                  await reportBlog();
                  modals.closeAll();
                  notifications.show({
                    color: "teal",
                    icon: <IconCheck size="1.1rem" />,
                    title: "Report submitted",
                    message: "Thank you for you feedback. Your report has been submitted and required action will be taken soon.",
                  });
                } catch (error: any) {
                  notifications.show({
                    color: "red",
                    title: "Report submission failed",
                    message: error.data.error ?? "Faild to submit report",
                  });
                }
              }
            }}
          >
            Report
          </Button>
        </Flex>
      </>
    );
  };

  const reportBlogHandler = () => {
    modals.open({
      centered: true,
      title: <Text fw={"bold"}>Report blog</Text>,
      children: <ModalContent />,
    });
  };

  return (
    <Alert icon={<IconExclamationCircle />}>
      <Text fw={"bold"}>Report Blog </Text>
      <Text>Find anything inappropriate. You can report blog by adding your reason</Text>
      <br />
      <Button variant="outline" onClick={reportBlogHandler}>
        Report blog
      </Button>
    </Alert>
  );
};

export default ReportBlogComponet;
