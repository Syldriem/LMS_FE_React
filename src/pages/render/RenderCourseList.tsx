import { useNavigate } from "react-router-dom";
import { CourseCard } from "../../components";
import { useApiContext } from "../../hooks/useApiDataContext";
import { EventHandler, MouseEventHandler, useState } from "react";
import { ICourses } from "../../utils";

export function RenderCourseList() {
  const { courses, setCourse } = useApiContext();
  const navigate = useNavigate();
  const NavToCourseDetails = () => {
    navigate("/coursedetails");
  };
  function handleClick(course: any) {
    console.log(course.id);
    setCourse(course);
    NavToCourseDetails();
  }
  return (
    <>
      <h1 className="sub-title">Course List</h1>

      <section className="container">
        <div className="row">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.Id}
                className="col-sm"
                onClick={() => handleClick(course)}
              >
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            <div>no courses</div>
          )}
        </div>
      </section>
    </>
  );
}
