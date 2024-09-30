import { CourseCard } from "../../components";
import { useApiContext } from "../../hooks/useApiDataContext";

export function RenderCourseList() {
  const { courses } = useApiContext();
  return (
    <>
      <h1 className="sub-title">Course List</h1>

      <section className="container">
        <div className="row">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div className="col-sm">
                <CourseCard key={course.Id} course={course} />
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
