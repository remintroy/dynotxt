import { useLocation } from "react-router-dom";

const usePathHook = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter((e) => e);
  return path
};

export default usePathHook;
