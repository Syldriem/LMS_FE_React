import { useNavigate } from "react-router-dom";
import { CourseCard } from "../../components";
import { useApiContext } from "../../hooks/useApiDataContext";

export function RenderCourseList() {
  const { courses, setCourse } = useApiContext();
  const navigate = useNavigate();
  const NavToCourseDetails = (courseId: any) => {
    navigate(`/coursedetails/${courseId}`);
  };
  function handleClick(course: any) {
    console.log(course.id);
    setCourse(course);
    NavToCourseDetails(course.id);
  }
  return (
    <>
      <h1 className="sub-title">Course List</h1>

      <section className="container">
        <div className="row row-cols-4">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="col"
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
