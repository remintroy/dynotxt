import { Avatar, Box, Card, Chip, Divider, Flex, Grid, Text, useMantineColorScheme } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { useGetAnalyticsFollwersQuery, useGetUserDataWithUidQuery } from "../../../lib/api/authApi";
import usePathHook from "../../../hooks/usePath";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { useGetBlogDataDisplayQuery, useGetBlogViewCountByUserIdQuery } from "../../../lib/api/blogApi";
import { useEffect } from "react";
import { addBlogToAllBlogsProfile, resetProfile, setAllBlogsMetaDataProfile } from "../../../lib/redux/slices/profile";
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import useUserDataHook from "../../../hooks/useUserData";

ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Tooltip);

const ProfileSettingsDashboardSubPage = () => {
  const path = usePathHook();
  const user = useUserDataHook();
  const { colorScheme } = useMantineColorScheme();
  const { data: userData } = useGetUserDataWithUidQuery(path[1]);
  const blogData = useAppSelector((state) => state.profile?.allBlogsMetaData);
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const dispatch = useAppDispatch();
  const { data: blogsData } = useGetBlogDataDisplayQuery({ uid: path[1], page: 1 });
  useEffect(() => {
    // assignig AllBlogs data to redux
    if (blogsData) {
      blogsData?.docs?.forEach((blog: any) => {
        dispatch(addBlogToAllBlogsProfile(blog));
      });
      let allBlogsMetaData: any = JSON.stringify(blogsData);
      allBlogsMetaData = JSON.parse(allBlogsMetaData);
      allBlogsMetaData.docs = null;
      dispatch(setAllBlogsMetaDataProfile(allBlogsMetaData));
    }
  }, [blogsData]);

  useEffect(() => {
    return () => {
      dispatch(resetProfile());
    };
  }, []);

  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);

  const { data: followersAnalyticsData } = useGetAnalyticsFollwersQuery({}, { skip: !user });
  const dataForListLables = followersAnalyticsData?.map((data: any) => data.date);
  const dataForList = followersAnalyticsData?.map((data: any) => data.count);

  const { data: viewsOfAllBlogsData } = useGetBlogViewCountByUserIdQuery({});
  const viewsOfAllBlogsLables = viewsOfAllBlogsData?.map((data: any) => data.date);
  const viewsOfAllBlogs = viewsOfAllBlogsData?.map((data: any) => data.count);

  return (
    <div style={{ padding: thisIsPc ? "20px" : 5 }}>
      <NavigationProgress progressLabel="Page progress bar" />
      <Box>
        <Flex gap={thisIsPc ? "30px" : "15px"} align={"center"} my={20}>
          <Avatar alt={`${user?.name}'s profile photo`} size={thisIsPc ? "xl" : "lg"} radius={"lg"} src={userData?.photoURL} />
          <div>
            <Flex mb={10} align={"center"} gap={20}>
              <Text fz={thisIsPc ? "28px" : "xl"} fw="bold" style={{ margin: 0, padding: 0 }}>
                {userData?.name}
              </Text>
            </Flex>
            <Flex gap={5}>
              <Chip size={thisIsPc ? "sm" : "xs"} checked={false}>
                {formatter.format(blogData?.totalDocs ?? 0)} Blogs
              </Chip>
              <Chip size={thisIsPc ? "sm" : "xs"} checked={false}>
                {formatter.format(userData?.followers ?? 0)} Followers
              </Chip>
              <Chip size={thisIsPc ? "sm" : "xs"} checked={false}>
                {formatter.format(userData?.following ?? 0)} Following
              </Chip>
            </Flex>
          </div>
        </Flex>
        <Text my={20}>{userData?.bio}</Text>
      </Box>
      <Divider />
      <Grid gutter={0} gutterLg={20} w={"100%"} m={0}>
        <Grid.Col span={12} mt={20}>
          <Card>
            <Text fz={"xl"} fw="bold">
              Blogs views
            </Text>
            <br />
            <Box sx={{ height: "300px", width: "100%" }}>
              <Line
                data={{
                  labels: viewsOfAllBlogsLables,
                  datasets: [
                    {
                      label: "Blog views",
                      data: viewsOfAllBlogs,
                      borderWidth: 1,
                      backgroundColor: colorScheme == "dark" ? "yellow" : "blue",
                      borderColor: colorScheme == "dark" ? "yellow" : "blue",
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        precision: 0,
                      },
                    },
                  },

                  backgroundColor: "red",
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card>
            <Text fz={"xl"} fw="bold">
              New Followers
            </Text>
            <br />
            <Box sx={{ height: "300px", width: "100%" }}>
              <Line
                data={{
                  labels: dataForListLables,
                  datasets: [
                    {
                      label: "Followers",
                      data: dataForList,
                      borderWidth: 1,
                      backgroundColor: colorScheme == "dark" ? "yellow" : "blue",
                      borderColor: colorScheme == "dark" ? "yellow" : "blue",
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        precision: 0,
                      },
                    },
                  },

                  backgroundColor: "red",
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ProfileSettingsDashboardSubPage;
