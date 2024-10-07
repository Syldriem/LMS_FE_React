import { useContext, useEffect } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { RenderMyCoursePage } from "./render/RenderMyCoursePage";
import { Header } from "../components/Header";

export function MyCoursePage() {
  const { myCourse,user,myCourseuserList } =
    useContext(ApiDataContext);
    

  return (
    <>
    <div className="home-section">
    <Header></Header>
      <RenderMyCoursePage course={myCourse} users={myCourseuserList} user={user} />
    </div>
    </>
  );
}
