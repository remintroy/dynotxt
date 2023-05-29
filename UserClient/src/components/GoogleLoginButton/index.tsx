import { Button, rem } from "@mantine/core";
import GoogleIcon from "../../assets/google-logo.png";

const GoogleLoginButtonComponent = ({ onClick }: any) => {
  const buttonStyle = {
    root: {
      paddingTop: rem(25),
      paddingBottom: rem(25),
    },
    inner: {
      height: "20px",
    },
  };

  const sx = {
    width: "100%",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    marginTop: "20px",
    img: {
      width: "30px",
    },
  };

  return (
    <Button styles={buttonStyle} sx={sx} leftIcon={<img src={GoogleIcon} alt="" />} onClick={onClick} className="google" variant="outline">
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButtonComponent;
