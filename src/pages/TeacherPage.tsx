import { MouseEventHandler, ReactElement, useEffect } from "react";
import { ModuleCard, StudentCard, LogoutBtn, CourseCard } from "../components";
import "../css/index.css";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export function TeacherPage(): ReactElement {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleOnAddCourse: MouseEventHandler<HTMLButtonElement> = (): void => {

  };

  return (
    <main className="main-container">
      <header className="header-container">
        <div className="navbar-container">
          <div className="navbar">
            <a className="style active" href="#courses">
              Courses
            </a>
            <a className="style" href="#users">
              User Admin
            </a>
          </div>
          <LogoutBtn />
        </div>
      </header>

      <div className="course-btn-container">
        <button className="course-btn-layout" onClick={handleOnAddCourse}>
          Add Course
        </button>
      </div>

      <h1 className="sub-title">Course List</h1>

      <section className="section-container">
        <div className="coursecard-container">
          <CourseCard />
        </div>
        <div className="coursecard-container">
          <CourseCard />
        </div>
        <div className="coursecard-container">
          <CourseCard />
        </div>
        <div className="coursecard-container">
          <CourseCard />
        </div>
        <div className="coursecard-container">
          <CourseCard />
        </div>
      </section>
    </main>
  );
}
