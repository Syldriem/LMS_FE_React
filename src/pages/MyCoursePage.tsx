import { useContext, useEffect } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { RenderMyCoursePage } from "./render/RenderMyCoursePage";

export function MyCoursePage() {
  const { userList, course, fetchUsersByCourse } =
    useContext(ApiDataContext);

    /*

  useEffect(() => {
    fetchUsersByCourse();
  }, []);*/

  return (
    <>
      <RenderMyCoursePage course={course} users={userList} user={null} />
    </>
  );
}
