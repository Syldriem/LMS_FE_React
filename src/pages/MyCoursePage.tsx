import { useContext, useEffect } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { useAuthContext } from "../hooks";
import "../css/MyCoursePage.css";
import { useNavigate } from "react-router-dom";
import { RenderMyCoursePage } from "./render/RenderMyCoursePage";
export function MyCoursePage() {
  const { user, users, course } = useContext(ApiDataContext);
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Test");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return <RenderMyCoursePage course={course} user={user} users={users} />;
}
