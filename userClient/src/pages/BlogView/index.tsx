import { Avatar, Button, Chip, Container, IconButton, Tooltip } from "@mui/material";
import "./style.scss";
import { useAppSelector } from "../../redux/hooks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import CopyAllIcon from "@mui/icons-material/CopyAll";

const BlogView = () => {
  const user = useAppSelector((state) => state.user.data);

  const codeStringa = `const foo=123;const bar="hello";const lol={"name":"authserver","version":"1.0.0","description":
  "Auth server for dynotxt","main":"build/index.js","scripts":{"test":"jest --watchAll --verbose --coverage","start":
  "nodemon build/index.js","build":"tsc -w" },"jest":{"testPathIgnorePatterns":["src"]},"keywords":["Auth","server" ]
  ,"author":"Remin T Roy","license":"ISC","dependencies":{"bcryptjs":"^2.4.3","colors":"^1.4.0","cookie-parser":"^1.4.6",
  "cors":"^2.8.5","dotenv":"^16.0.3","dynotxt-common-services":"^1.0.1","express":"^4.18.2","firebase-admin":"^11.5.0",
  "mongoose":"^7.0.3","mongoose-paginate-v2":"^1.7.1","morgan":"^1.10.0","random-id":"^1.0.4","typescript":"^5.0.3",
  "validator":"^13.9.0"},"devDependencies":{"@types/bcryptjs":"^2.4.2","@types/cookie-parser":"^1.4.3","@types/cors":
  "^2.8.13","@types/express":"^4.17.17","@types/jest":"^29.5.0","@types/morgan":"^1.9.4","@types/validator":"^13.7.14",
  "jest":"^29.5.0","nodemon":"^2.0.22"}}`;

  const codeString = ` 
  const foo = 123;
  const bar = "hello";
  const lol = {
    name: "authserver",
    version: "1.0.0",
    description: "Auth server for dynotxt",
    main: "build/index.js",
    scripts: { test: "jest --watchAll --verbose --coverage", start: "nodemon build/index.js", build: "tsc -w" },
    jest: { testPathIgnorePatterns: ["src"] },
    keywords: ["Auth", "server"],
    author: "Remin T Roy",
    license: "ISC",
    dependencies: {
      bcryptjs: "^2.4.3",
      colors: "^1.4.0",
      "cookie-parser": "^1.4.6",
      cors: "^2.8.5",
      dotenv: "^16.0.3",
      "dynotxt-common-services": "^1.0.1",
      express: "^4.18.2",
      "firebase-admin": "^11.5.0",
      mongoose: "^7.0.3",
      "mongoose-paginate-v2": "^1.7.1",
      morgan: "^1.10.0",
      "random-id": "^1.0.4",
      typescript: "^5.0.3",
      validator: "^13.9.0",
    },
    devDependencies: {
      "@types/bcryptjs": "^2.4.2",
      "@types/cookie-parser": "^1.4.3",
      "@types/cors": "^2.8.13",
      "@types/express": "^4.17.17",
      "@types/jest": "^29.5.0",
      "@types/morgan": "^1.9.4",
      "@types/validator": "^13.7.14",
      jest: "^29.5.0",
      nodemon: "^2.0.22",
    },
  };
  `;

  // console.log(codeString);

  let finalCodeString: string = "";
  try {
    finalCodeString = prettier.format(codeString, {
      parser: "babel",
      plugins: [parserBabel],
    });
  } catch (error) {
    console.log(error);
  }

  const htmlCode = hljs.highlightAuto(finalCodeString);

  return (
    <Container className="BlogView">
      <div className="descrition-page box">
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

        <div className="imgCont">
          <img src="/sample/title-img.jpg" alt="" />
        </div>
        <div className="title">
          <h1>Getting started with creating server using nodejs and express</h1>
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

      <div className="contents underline">
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
        <h2># Intro</h2>
        <p>Lets start by understanding the basic concept of nodejs and express</p>
      </div>

      <div className="code-snippet">
        <div className="title">
          <div>Snippets</div>
          <div className="button">
            <CopyAllIcon fontSize="small" />
            copy code
          </div>
        </div>
        <pre>
          <code>
            <div dangerouslySetInnerHTML={{ __html: htmlCode.value }} />
          </code>
        </pre>
      </div>

      <div className="dummy"></div>
    </Container>
  );
};

export default BlogView;
