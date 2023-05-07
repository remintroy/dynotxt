import { useEffect, useState } from "react";
import { blogBackend } from "../../lib/axios";
import { useAppSelector } from "../../lib/redux/hooks";
import { useNavigate } from "react-router-dom";

const NewBlogStarter = () => {
  const user = useAppSelector((state) => state.user.data);
  const [status, setStatus] = useState({ error: false, message: "" });
  const navigate = useNavigate();

  const startNewBlog = async () => {
    try {
      const {
        data: { blogId, status },
      } = await blogBackend.post("/blog", {}, { headers: { Authorization: `Bearer ${user?.accessToken}` } });
      navigate(`/blog/edit/${blogId}`);
    } catch (error) {
      setStatus({ error: true, message: "Faild to create new blog" });
    }
  };

  useEffect(() => {
    startNewBlog();
  }, []);

  return <div>{status.message}</div>;
};

export default NewBlogStarter;
