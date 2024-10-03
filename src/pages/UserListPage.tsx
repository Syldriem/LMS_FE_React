import { MouseEventHandler, ReactElement, useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { useAuthContext } from "../hooks";
import "../css/UserListPage.css";
import { useNavigate } from "react-router-dom";
import { RenderUserListPage } from "./render/RenderUserList";
import { ICourses } from "../utils";
import { Header } from "../components/Header";

export function UserListPage(): ReactElement {
  const { users, getCourseById, userCourses, fetchUsers } = useContext(ApiDataContext);
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      fetchUsers();     
    }
  }, [getCourseById]);
  
  return <>
  
  <RenderUserListPage users={users} courses={userCourses}/>
  </>;

}
