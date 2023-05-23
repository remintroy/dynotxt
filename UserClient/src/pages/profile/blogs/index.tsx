import { Box, Divider, Flex, Image, Progress, Table, Text } from "@mantine/core";

const ProfileBlogsPage = () => {
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
          <tr>
            <td>
              <Flex gap={20}>
                <Box h={100}>
                  <Image
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/dynotxt.appspot.com/o/users%2FqeDmbz53AZPl9e23A9DPHod9ocO2%2Fpp.jpg?alt=media&token=22cfd620-1ea3-4257-98ff-80157d81f563"
                    }
                    width={150}
                    height={100}
                  />
                </Box>
                <Box>
                  <Text lineClamp={4} fz={"md"}>
                    Create a load balancer using Node.js + Express.js
                  </Text>
                </Box>
              </Flex>
            </td>
            <td>Public</td>
            <td>200K</td>
            <td>30K</td>
            <td>None</td>
            <td>{new Date().toDateString()}</td>
            <td>
              <Text align="end">100%</Text>
              <Text align="end">100 Likes</Text>
              <Text align="end">0 Dislikes</Text>
              <Progress value={100} mt={10} />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ProfileBlogsPage;
