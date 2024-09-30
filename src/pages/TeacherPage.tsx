import { MouseEventHandler, ReactElement } from "react";
import { ModuleCard, StudentCard, LogoutBtn, CourseCard } from "../components";
import "../css/index.css"




export function TeacherPage() : ReactElement {
console.log("Teacher page entered");

const handleOnAddCourse: MouseEventHandler<HTMLButtonElement> = (): void => {

    console.log("into address function");
    <AddCourse/>;



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
        {/* <div className="teacher-container">
          <h4 className="teacher">Teachers-name: is logged in</h4>
        </div> */}
        <div className="course-btn-container" onClick={handleOnAddCourse}>
          <button className="course-btn-layout">Add Course</button>
        </div>
        <h1 className="sub-title">Course List</h1>
        <section className="section-container">
          {/* <div className="course-section"> */}
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