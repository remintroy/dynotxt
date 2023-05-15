import { Alert, Box, Button, Card, Chip, CircularProgress, Modal, Paper, Typography } from "@mui/material";
import { useDeleteFlaggesForSingleBlogMutation, useGetFlaggedBlogsQuery } from "../../../lib/api/blogApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import { Delete, Launch, WarningRounded } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

const ManageBlogsReportedBlogsComponent = () => {
  const user = useAppSelector((state) => state.user.data);
  const { data } = useGetFlaggedBlogsQuery({}, { skip: !user });

  const theme: any = useTheme();
  const { dark } = useContext(ThemeContext);

  const ReportListComponent = ({ report }: any) => {
    const [openAction, setOpenAction] = useState(false);
    const [deleteFlagsForSingleBlogApi] = useDeleteFlaggesForSingleBlogMutation();
    const [deleteFlagsLoading, setDeleteFlagsLoading] = useState(false);

    const handleDeleteFlags = async () => {
      try {
        setDeleteFlagsLoading(true);
        await deleteFlagsForSingleBlogApi(report.blogId);
        setDeleteFlagsLoading(false);
      } catch (error) {
        setDeleteFlagsLoading(false);
        console.log(error);
      }
    };

    return (
      <div>
        <Card
          elevation={1}
          sx={{
            mt: 1,
            p: 3,
            border: `1px solid ${dark ? theme.palette.primary.dark : theme.palette.primary.light}`,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "start", gap: 3 }}>
              <Chip
                sx={{ mt: 1 }}
                color={report.count < 5 ? (report.count < 2 ? "secondary" : "warning") : "error"}
                icon={<WarningRounded fontSize="small" />}
                label={report.count}
              />
              <Box>
                <Typography variant="h6">{report.blog?.title} </Typography>

                {report?.flags?.map((flag: any, index: any) => {
                  return (
                    <Box key={index}>
                      <Typography sx={{ display: "inline" }} color={"dimgray"}>
                        {new Date(flag.createdAt).toDateString()} :{" "}
                      </Typography>
                      <Typography sx={{ display: "inline" }} variant="body1">
                        {flag?.reason}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box sx={{ mt: 4, display: "flex", gap: 1 }}>
              <Modal
                onClose={() => setOpenAction(false)}
                open={openAction}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Paper sx={{ border: `1px solid ${dark ? theme.palette.primary.dark : theme.palette.primary.light}` }}>
                  <Box sx={{ maxWidth: "400px", p: 3 }}>
                    <Typography variant="h5">Take action</Typography>

                    <Typography mt={1} variant="h6" fontStyle={"bold"}>
                      {report.blog?.title}{" "}
                    </Typography>
                    <Typography mt={1} variant="body1">
                      {report.blog?.subtitle}
                    </Typography>

                    <Alert icon={<></>} sx={{ mt: 2 }} color="info">
                      This is critical action will effect how this blog perfoms in this platform !
                    </Alert>

                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                      <Button variant="contained">Disable Blog</Button>
                      <Button
                        startIcon={deleteFlagsLoading ? <CircularProgress size={"20px"} /> : <Delete />}
                        onClick={() => handleDeleteFlags()}
                      >
                        Delete Reports
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Modal>
              <Button variant="contained" onClick={() => setOpenAction(true)}>
                Take Action
              </Button>
              <Link target="_blank" to={`https://dynotxt.com/blog/${report?.blogId}`}>
                <Button variant="outlined" startIcon={<Launch />}>
                  Open Blog
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </div>
    );
  };

  return (
    <div>
      {data?.map((report: any) => {
        return <ReportListComponent key={report?.blogId} report={report} />;
      })}
    </div>
  );
};

export default ManageBlogsReportedBlogsComponent;
