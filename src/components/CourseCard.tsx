import { MouseEventHandler, ReactElement } from "react";
import "../css/index.css";





export function CourseCard(): ReactElement {


    const handleOnExpand: MouseEventHandler<HTMLButtonElement> = (): void => {};
    const handleOnListStudents: MouseEventHandler<
      HTMLButtonElement
    > = (): void => {};
    
    
    
    
    
    
    
    
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
          <button className="course-btn-layout" onClick={handleOnExpand}>
            Expand
          </button>
          <button className="course-btn-layout" onClick={handleOnListStudents}>
            List Students
          </button>
        </div>
      </section>
    );
}