import { MouseEventHandler, ReactElement, useEffect } from "react";
import { ModuleCard, StudentCard, LogoutBtn, CourseCard } from "../components";
import "../css/index.css";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useApiContext } from "../hooks/useApiDataContext";
import { RenderCourseList } from "./render/RenderCourseList";
import { Header } from "../components/Header";

export function TeacherPage(): ReactElement {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleOnAddCourse: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {};

  return (
    <main className="main-container">
      <Header />
      {/*<div className="course-btn-container">
        <button className="course-btn-layout" onClick={handleOnAddCourse}>
          Add Course
        </button>
      </div>*/}
      <RenderCourseList />
      <LogoutBtn />
    </main>
  );
}
