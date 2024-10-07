import { MouseEventHandler, ReactElement } from "react";
import "../css/index.css";
import { ICourses } from "../utils";

interface ICourseProps {
  course: ICourses;
  handleCourseDelete: (courseId: string) =>Promise<void>;
}
export function CourseCard({ course,handleCourseDelete }: ICourseProps): ReactElement {

  // TODO: update courseDTO to include Id so that we can use it to make getCourseById request
  // for when we click on the course card.
  // TODO: Make Teacher version of mycoursepage AKA course details page => render courses' modules and courses' students
  // TODO:

  return (
    <section className="course-card-src">
      <h2 className="title-card">{course.name}</h2>
      <h4 className="module-card">Module List</h4>
      <section className="info-display">
        <div className="course-modules">
          {course && course.modules && course.modules.length > 0 ? (
            course.modules.map((module) => (
              <div className="desc col-md-3">
                <p className="cat-lbl">{module.name}</p>
              </div>
            ))
          ) : (
            <p>No modules available.</p>
          )}
        </div>
      </section>
      <button
            className="btn btn-danger btn-sm ms-2"
            onClick={(e) => {
              e.stopPropagation();
              handleCourseDelete(course.id);
            }}
          >
            Delete
          </button>
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
