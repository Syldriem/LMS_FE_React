import { useEffect } from "react";
import { ModuleCard, StudentCard } from "../../components";
import { Header } from "../../components/header";
import { useApiContext } from "../../hooks/useApiDataContext";
import { useAuthContext, useFetchWithToken } from "../../hooks";
import { BASE_URL, CustomError } from "../../utils";
import { useNavigate } from "react-router-dom";

export function RenderCourseDetails() {
  const { course, users, getCourseById } = useApiContext();
  // TODO: GetCourseById
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    const getCourse = async () => {
      await getCourseById();
    };
    getCourse();
  }, [isLoggedIn, navigate]);
  console.log(course);

  return (
    <>
      <Header />
      <main className="home-section">
        <p className="title">{course?.name}</p>
        <div className="doc-btn-contanier">
          {/*<button className="btn-layout">Documents</button>*/}
        </div>
        <div className="section-container">
          <section className="module-section">
            <p className="sub-tit">Modules List</p>
            {course && course.modules && course.modules.length > 0 ? (
              course.modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))
            ) : (
              <p>No modules available.</p>
            )}
          </section>
          <section className="students-section">
            <p className="sub-tit">Students List</p>
            {users && users.length > 0 ? (
              users.map((user) => (
                <StudentCard
                  key={user.id}
                  student={{
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                  }}
                />
              ))
            ) : (
              <p>No students available.</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
