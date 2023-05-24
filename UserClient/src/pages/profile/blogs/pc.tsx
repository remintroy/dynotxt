import { ActionIcon, Box, Flex, Image, Menu, Progress, Table, Text, Tooltip } from "@mantine/core";
import { IconExternalLink, IconTrash } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconChevronDown, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteBlogWithBlogIdMutation, usePutPublishBlogMutation, usePutUnPublishBlogMutation } from "../../../lib/api/blogApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import { nprogress } from "@mantine/nprogress";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

const PcProfileBlogsPageComponent = () => {
  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);

  const [makePublicApi] = usePutPublishBlogMutation();
  const [makePrivateApi] = usePutUnPublishBlogMutation();
  const [deleteBlogApi] = useDeleteBlogWithBlogIdMutation();

  const formatter = Intl.NumberFormat("us", { notation: "compact" });

  const blogActionHandler = async (apiCallFuntion: any, blogId: string) => {
    try {
      nprogress.set(0);
      nprogress.start();
      // calling currsponding api
      await apiCallFuntion(blogId).unwrap();
      nprogress.complete();
    } catch (error: any) {
      nprogress.complete();
      notifications.show({
        color: "red",
        title: "Oops something went wrong",
        message:
          error?.data?.error ?? "There was an error diring updating blog visiblity. Consier trying agter sometime",
      });
    }
  };

  const handleConfirmation = async (
    actionApi: any,
    blogId: string,
    message: string,
    button: string,
    color?: string
  ) => {
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      confirmProps: { color },
      children: <Text size="sm">{message}</Text>,
      labels: { confirm: button, cancel: "Cancel" },
      onConfirm: () => {
        blogActionHandler(actionApi, blogId);
      },
    });
  };

  const makePublic = (blogId: string) => {
    handleConfirmation(
      makePublicApi,
      blogId,
      "This change the visiblity of this blog to pubic. Your will be shared and listed in searchs and can be seen by anyone.",
      "Make public"
    );
  };

  const makePrivate = (blogId: string) => {
    handleConfirmation(
      makePrivateApi,
      blogId,
      "This change the visiblity of this blog to private. Your blog won't be able view by other users.",
      "Make private",
      "red"
    );
  };

  const trashBlog = (blogId: string) => {
    handleConfirmation(
      deleteBlogApi,
      blogId,
      "This will move your blog to trash and you can recover blog from trash at any time.",
      "Move to trash",
      "red"
    );
  };

  return (
    <>
      <h2>Manage your blogs</h2>
      <Table highlightOnHover verticalSpacing="xs">
        <thead>
          <tr>
            <th>Blog</th>
            <th>Visiblity</th>
            <th>views</th>
            <th>comments</th>
            <th>Restrictions</th>
            <th>Date</th>
            <th>Likes & dislikes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(allBlogsData).map((key: string) => {
            const blog = allBlogsData[key];
            const totalViews = Number((blog?.reactions?.likes || 0) + (blog?.reactions?.dislikes || 0));
            const likePercent = ~~((blog?.reactions?.likes / totalViews) * 100);

            return (
              <tr key={blog?.blogId}>
                <td>
                  <Box
                    sx={{
                      ":hover": {
                        ".hoverable": {
                          display: "flex",
                        },
                      },
                    }}
                  >
                    <Flex gap={20}>
                      <Box h={100}>
                        <Image src={blog?.bannerImgURL} width={150} height={100} />
                      </Box>
                      <Box maw={500} miw={300}>
                        <Text lineClamp={2} fz={"md"}>
                          {blog?.title}
                        </Text>
                        <Text lineClamp={1} color="dimmed" fz={"sm"}>
                          {blog?.subtitle}
                        </Text>
                        <Flex p={10} gap={5} className="hoverable" sx={{ display: "none" }}>
                          <Tooltip withArrow label="Edit your blog">
                            <Link to={`/blog/edit/${blog?.blogId}`}>
                              <ActionIcon>
                                <IconPencil size={"20px"} />
                              </ActionIcon>
                            </Link>
                          </Tooltip>
                          <Tooltip label="Open your blog" withArrow>
                            <Link to={`/blog/${blog?.blogId}`}>
                              <ActionIcon>
                                <IconExternalLink size={"20px"} />
                              </ActionIcon>
                            </Link>
                          </Tooltip>
                          <Menu>
                            <Menu.Target>
                              <Tooltip withArrow label="Actions and more options for your blog">
                                <ActionIcon>
                                  <IconDotsVertical size={"20px"} />
                                </ActionIcon>
                              </Tooltip>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                color="red"
                                icon={<IconTrash size={14} />}
                                onClick={() => trashBlog(blog?.blogId)}
                              >
                                Trash blog
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                </td>
                <td>
                  {blog?.disabled ? (
                    "-"
                  ) : blog?.published ? (
                    <Menu>
                      <Menu.Target>
                        <Tooltip withArrow label="You blog is currently public click to change">
                          <Flex sx={{ cursor: "pointer" }} align={"center"} gap={5}>
                            <IconWorld size={"20px"} />
                            Public
                            <ActionIcon>
                              <IconChevronDown size={"15px"} />
                            </ActionIcon>
                          </Flex>
                        </Tooltip>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item icon={<IconLock size={14} />} onClick={() => makePrivate(blog?.blogId)}>
                          Make private
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  ) : (
                    <Menu>
                      <Menu.Target>
                        <Tooltip withArrow label="You blog is currently private click to change">
                          <Flex sx={{ cursor: "pointer" }} align={"center"} gap={5}>
                            <IconLock size={"20px"} />
                            Private
                            <IconChevronDown size={"15px"} />
                          </Flex>
                        </Tooltip>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item icon={<IconWorld size={14} />} onClick={() => makePublic(blog?.blogId)}>
                          Make public
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </td>
                <td>{formatter.format(blog?.views)}</td>
                <td>{formatter.format(blog?.comments)}</td>
                <td>
                  {blog?.disabled ? (
                    <>
                      <Tooltip withArrow label="We have found something inappropriate in you blog">
                        <Text>Disabled</Text>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip withArrow label="Your blog has no restrictions">
                        <Text>None</Text>
                      </Tooltip>
                    </>
                  )}
                </td>
                <td>
                  <Tooltip withArrow label="Date which your blog was created">
                    <Box>
                      <Text>{new Date(blog?.createdAt).toDateString()}</Text>
                      <Text color="dimmed">created</Text>
                    </Box>
                  </Tooltip>
                </td>
                <td>
                  <Tooltip
                    withArrow
                    label={`Your blog has ${formatter.format(blog?.reactions?.likes)} likes and ${formatter.format(
                      blog?.reactions?.dislikes
                    )} dislikes`}
                  >
                    <Box>
                      <Text align="end">{likePercent}%</Text>
                      <Text color="dimmed" align="end">
                        {formatter.format(blog?.reactions?.likes)} Likes
                      </Text>
                      <Progress value={likePercent} mt={10} />
                    </Box>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PcProfileBlogsPageComponent;
