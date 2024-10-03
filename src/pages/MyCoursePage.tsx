import { useContext, useEffect } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { useAuthContext } from "../hooks";
import "../css/MyCoursePage.css";
import { useNavigate } from "react-router-dom";
import { RenderMyCoursePage } from "./render/RenderMyCoursePage";
export function MyCoursePage() {
  const { user, userList, course, fetchUsersByCourse } =
    useContext(ApiDataContext);
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Test");
      navigate("/login");
    }
    fetchUsersByCourse();
  }, [isLoggedIn, navigate, course]);

  return (
    <>
      <RenderMyCoursePage course={course} users={userList} />
    </>
  );
}
