import { MouseEventHandler, ReactElement, useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { useAuthContext } from "../hooks";
import "../css/UserListPage.css";
import { useNavigate } from "react-router-dom";
import { RenderUserListPage } from "./render/RenderUserList";
import { ICourses } from "../utils";

export function UserListPage(): ReactElement {
  const { users, getCourseById, userCourses } = useContext(ApiDataContext);
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Test");
      navigate("/login");
    }
  }, [isLoggedIn, navigate, getCourseById]);

  return <RenderUserListPage users={users} courses={userCourses}/>;

}


