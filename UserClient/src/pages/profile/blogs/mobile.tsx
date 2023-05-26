import { Tabs, Text } from "@mantine/core";
import { IconFileAnalytics } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { NavigationProgress } from "@mantine/nprogress";
import MBAllBLogsTableProfileComponent from "../../../components/profile/blogs/MbAllBlogsTable";
import MbTrashedBLogsProfileComponent from "../../../components/profile/blogs/MbTrashedBlogs";

const MoblieProfileBlogPageComponent = () => {
  return (
    <div>
      <NavigationProgress />
      <Text fz={"xl"} fw={"bold"} mb={"md"}>
        Manage your blogs
      </Text>
      <Tabs defaultValue="allblogs">
        <Tabs.List>
          <Tabs.Tab value="allblogs" icon={<IconFileAnalytics size="1rem" />}>
            AllBlogs
          </Tabs.Tab>
          {/* <Tabs.Tab value="bloglist" icon={<IconList size="1rem" />}>
            Blog list
          </Tabs.Tab> */}
          <Tabs.Tab value="trashed" icon={<IconTrash size="1rem" />}>
            Trashed
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="allblogs" pt="xs">
          <MBAllBLogsTableProfileComponent />
        </Tabs.Panel>

        <Tabs.Panel value="trashed" pt="xs">
          <MbTrashedBLogsProfileComponent />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default MoblieProfileBlogPageComponent;
