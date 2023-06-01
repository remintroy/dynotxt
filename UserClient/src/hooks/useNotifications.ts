import { useAppSelector } from "../lib/redux/hooks";

const useNotificationsHook = () => {
  const notifications = useAppSelector((state) => state.notification.list);
  return notifications;
};

export default useNotificationsHook;
