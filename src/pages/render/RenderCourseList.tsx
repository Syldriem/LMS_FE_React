import { CourseCard } from "../../components";
import { useApiContext } from "../../hooks/useApiDataContext";

export function RenderCourseList() {
  const { courses } = useApiContext();
  return (
    <>
      <h1 className="sub-title">Course List</h1>

      <section className="section-container">
        <div className="coursecard-container">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))
          ) : (
            <div>no courses</div>
          )}
        </div>
      </section>
    </>
  );
}
