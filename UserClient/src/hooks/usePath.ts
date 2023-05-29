import { useLocation } from "react-router-dom";

/**
 * @returns Array of path of current url as each index
 */
const usePathHook = () => {
  const location = useLocation();
  return location.pathname.split("/").filter((e) => e);
};

export default usePathHook;
