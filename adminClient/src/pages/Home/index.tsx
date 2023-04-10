import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserData } from "../../redux/userSlice";

const Home = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <div className="Home">
      <div>Name : {user?.name}</div>
      <div>Email : {user?.email}</div>
    </div>
  );
};

export default Home;
