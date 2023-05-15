import { useRouteError } from "react-router-dom";

const index = () => {
  const error:any = useRouteError();
  console.log(error);
  return <div>{error?.status}</div>;
};

export default index;
