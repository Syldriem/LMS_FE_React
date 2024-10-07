import { ReactElement, useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";

import "../css/UserListPage.css";

import { RenderUserListPage } from "./render/RenderUserList";
import { IUser, IUserCourse } from "../utils";


export function UserListPage(): ReactElement {
  const { getCourseById, userCourses, fetchUsers, handleDeleteUser, fetchUsersWithCourses,courses } = useContext(ApiDataContext);

  const [course, setCourses] = useState<IUserCourse[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCourses = await fetchUsersWithCourses(); // Replace with your API call
      const fetchedUsers = await fetchUsers(); // Replace with your API call
      setCourses(fetchedCourses);
      setUsers(fetchedUsers);
    };
  
    fetchData();
  }, []);
  
  
  return <>
  <RenderUserListPage users={users} courses={course} course={courses} deleteUser={handleDeleteUser}/>
  </>;
}
