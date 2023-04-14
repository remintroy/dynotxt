import { Avatar, Button, Chip, Container, IconButton, Tooltip } from "@mui/material";
import "./style.css";
import { useAppSelector } from "../../redux/hooks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";

const BlogView = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <Container className="BlogView">
      <div className="title">
        <h1>Getting started with creating server using nodejs and express</h1>
      </div>

      <div className="imgCont">
        <img src="/sample/title-img.png" alt="" />
      </div>

      <div className="descrition-page">
        <div className="profile-shareCont">
          <div className="profile">
            <Avatar src={user?.photoURL}></Avatar>
            <div className="details">
              <div className="name">{user?.name}</div>
              <div className="followers dim sm">20k Followers</div>
            </div>
            <br />
            <Tooltip title="Follow this creator">
              <Button variant="outlined" size="small">
                Follow
              </Button>
            </Tooltip>
          </div>

          <div className="buttons">
            <Tooltip title="Like this blog">
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share blog">
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send blog in-app">
              <IconButton>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="blog-details">
          <div className="line"></div>
          <div className="sm">
            15k
            <span className="dim b">&nbsp; Views &nbsp; </span>
            {new Date(`${user?.dob}`).toDateString()}
          </div>
        </div>
      </div>

      <div className="contents">
        <b>Content in this blog</b>
        <div className="contents-chip">
          <div className="chips">
            <Chip label="Intro" variant="outlined" />
            <Chip label="Requirements" variant="outlined" />
            <Chip label="Createing files" variant="outlined" />
            <Chip label="Installing nodejs" variant="outlined" />
            <Chip label="Initializing npm" variant="outlined" />
            <Chip label="Installing Express from npm" variant="outlined" />
            <Chip label="Creating server" variant="outlined" />
            <Chip label="Making a simple http request" variant="outlined" />
            <Chip label="Get response at browser" variant="outlined" />
            <Chip label="Finally" variant="outlined" />
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Intro</h2>
        <p>Lets start by understanding the basic concept of nodejs and express</p>
      </div>

      <div className="dummy"></div>
    </Container>
  );
};

export default BlogView;
