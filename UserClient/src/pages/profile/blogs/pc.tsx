import { Tabs } from "@mantine/core";
import { IconFileAnalytics, IconTrash } from "@tabler/icons-react";
import ProfileAllBLogsTableComponent from "../../../components/profile/blogs/PcAllBlogsTable";
import ProfileTrashedBlogsComponent from "../../../components/profile/blogs/PcTrashedBlogs";

const PcProfileBlogsPageComponent = () => {
  return (
    <>
      <h2>Manage your blogs</h2>
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

        <Tabs.Panel value="trashed" pt="xs">
          <ProfileTrashedBlogsComponent />
        </Tabs.Panel>

        <Tabs.Panel value="allblogs" pt="xs">
          <ProfileAllBLogsTableComponent />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default PcProfileBlogsPageComponent;
