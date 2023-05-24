import { ActionIcon, Box, Flex, Image, Menu, Text, Tooltip } from "@mantine/core";
import { useAppSelector } from "../../../lib/redux/hooks";
import { IconDotsVertical, IconLock, IconMessage, IconThumbUp, IconWorld } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";

const MoblieProfileBlogPageComponent = () => {
  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const dateFormatter = Intl.DateTimeFormat("us", { numberingSystem: "short" });

  return (
    <div>
        <Text fz={"xl"} fw={"bold"} mb={"md"}>Manage your blogs</Text>
      <Flex direction={"column"} gap={15}>
        {Object.keys(allBlogsData).map((key: string) => {
          const blog = allBlogsData[key];
          return (
            <Box>
              <Flex gap={10} justify={"space-between"}>
                <Flex gap={10}>
                  <Image width={130} height={80} src={blog?.bannerImgURL} />
                  <Box>
                    <Text lineClamp={1} fw="500" fz="md">
                      {blog?.title}
                    </Text>
                    <Text fz="sm" color="dimmed">
                      {formatter.format(blog?.views)} views . {dateFormatter.format(new Date())}
                    </Text>
                    <Flex align="center" gap={10}>
                      {blog?.published ? <IconWorld size={"15px"} /> : <IconLock size={"15px"} />}
                      <IconThumbUp size={"20px"} /> <small> {formatter.format(blog?.reactions?.likes || 0)}</small>
                      <IconMessage size={"15px"} /> <small> {formatter.format(blog?.comments || 0)}</small>
                    </Flex>
                  </Box>
                </Flex>
                <Box>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon>
                        <IconDotsVertical size={"20px"} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => "trashBlog(blog?.blogId)"}>
                        Trash blog
                      </Menu.Item>
                      <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => "trashBlog(blog?.blogId)"}>
                        Trash blog
                      </Menu.Item>
                      <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => "trashBlog(blog?.blogId)"}>
                        Trash blog
                      </Menu.Item>
                      <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => "trashBlog(blog?.blogId)"}>
                        Trash blog
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </div>
  );
};

export default MoblieProfileBlogPageComponent;
