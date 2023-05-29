import { useAppSelector } from "../lib/redux/hooks";

/**
 *
 * @returns Boolean value indicating user data has a loding or not
 */
const useUserDataLoadingHook = () => {
  return useAppSelector((state) => state.user.loading);
};

export default useUserDataLoadingHook;
