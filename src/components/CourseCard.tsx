import { MouseEventHandler, ReactElement } from "react";
import "../css/index.css";
import { ICourses } from "../utils";
import { MyCoursePage } from "../pages";
import { useNavigate } from "react-router-dom";

interface ICourseProps {
  course: ICourses;
}
export function CourseCard({ course }: ICourseProps): ReactElement {
  const navigate = useNavigate();
  const handleOnExpand: MouseEventHandler<HTMLButtonElement> = (): void => {};
  const handleOnListStudents: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {};
  // TODO: update courseDTO to include Id so that we can use it to make getCourseById request
  // for when we click on the course card.
  // TODO: Make Teacher version of mycoursepage AKA course details page => render courses' modules and courses' students
  // TODO:

  return (
    <section className="card border-light mb-3">
      <h2 className="card-header">{course.name}</h2>
      <div className="card-body" style={{ overflowY: "hidden" }}>
        <h4 className="card-title">Module List</h4>
        <section>
          <div className="course-modules">
            {course && course.modules && course.modules.length > 0 ? (
              course.modules.map((module) => (
                <div className="desc">
                  <li className="card-text">{module.name}</li>
                </div>
              ))
            ) : (
              <p>No modules available.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );

  /*
    return (
      <section className="course-card-src">
        <h2 className="title-card">Infinity Stones</h2>
              <h4 className="module-card">Module List</h4>
        <section className="info-display">
          <div className="course-modules">
            <div className="desc">
              <p className="cat-lbl">Module Name:</p>
              <p className="spec-lbl">What are Infinity Stones?</p>
            </div>

            <div className="desc">
              <p className="cat-lbl">Module Name:</p>
              <p className="spec-lbl">Why we need Infinity Stones</p>
            </div>
            <div className="desc">
              <p className="cat-lbl">Module Name:</p>
              <p className="spec-lbl">How to use Infinity Stones</p>
            </div>
          </div>

              <h4 className="student-card">Student List</h4>
          <div className="course-students">
            <div className="desc">
              <p className="cat-lbl">Student Name:</p>
              <p className="spec-lbl">Iam Groot</p>
            </div>
            <div className="desc">
              <p className="cat-lbl">Student Name:</p>
              <p className="spec-lbl">Captain America</p>
            </div>
            <div className="desc">
              <p className="cat-lbl">Student Name:</p>
              <p className="spec-lbl">Thanos</p>
            </div>
          </div>
        </section>

        <div className="btn-container">
          {/* <button className="course-btn-layout" onClick={handleOnExpand}>
            Expand
          </button> */
}
