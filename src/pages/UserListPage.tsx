import { ReactElement, useContext, useEffect } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";

import "../css/UserListPage.css";

import { RenderUserListPage } from "./render/RenderUserList";


export function UserListPage(): ReactElement {
  const { users, getCourseById, userCourses, fetchUsers } = useContext(ApiDataContext);

  useEffect(() => {
      fetchUsers();
      getCourseById();   
  }, []);
  
  return <>
  
  <RenderUserListPage users={users} courses={userCourses}/>
  </>;
}
