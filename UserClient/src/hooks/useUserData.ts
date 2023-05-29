import { useAppSelector } from "../lib/redux/hooks";

const useUserDataHook = () => {
  return useAppSelector((state) => state.user.data);
};

export default useUserDataHook;
