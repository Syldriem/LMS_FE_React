import { useNavigate } from "react-router-dom";
import { CourseCard } from "../../components";
import { useApiContext } from "../../hooks/useApiDataContext";
import { useEffect } from "react";

export function RenderCourseList() {
  const { courses, setCourse, fetchAllCourses, fetchUsersWithCourses, deleteCourse } = useApiContext();
  const navigate = useNavigate();
  const NavToCourseDetails = (courseId: any) => {
    navigate(`/coursedetails/${courseId}`);
  };
  function handleClick(course: any) {
    console.log(course.id);
    setCourse(course);
    NavToCourseDetails(course.id);
  }

  useEffect(() => {
    fetchAllCourses();
    fetchUsersWithCourses();
  }, []);
  

  return (
    <>
      <h1 className="sub-title">Course List</h1>

      <section className="container">
        <div className="row row-cols-4">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="col-md-4 mb-4"
                onClick={() => handleClick(course)}
              >
                <CourseCard course={course} handleCourseDelete={deleteCourse} />
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
