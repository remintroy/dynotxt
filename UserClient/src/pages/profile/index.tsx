import usePathHook from "../../hooks/usePath";
import { useAppSelector } from "../../lib/redux/hooks";
import ProfileDashBoardPage from "./dashboard";
import UserProfilePage from "./defaultPage";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.data);
  const userDataLoading = useAppSelector((state) => state.user.loading);
  const path = usePathHook();
  return <>{!userDataLoading && <>{user?.uid == path?.[1] ? <ProfileDashBoardPage /> : <UserProfilePage />}</>}</>;
};

export default ProfilePage;
