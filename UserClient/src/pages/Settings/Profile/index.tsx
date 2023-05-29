import usePathHook from "../../../hooks/usePath";
import useUserDataHook from "../../../hooks/useUserData";
import ProfileSettingsDashboardSubPage from "./Dashboard";
import NormalProfileSubPage from "./NormalProfile";

const ProfileSettingsPage = () => {
  const user = useUserDataHook();
  const path = usePathHook();
  return <div>{user && user?.uid == path[1] ? <ProfileSettingsDashboardSubPage /> : <NormalProfileSubPage />}</div>;
};

export default ProfileSettingsPage;
