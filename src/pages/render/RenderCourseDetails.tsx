import { useEffect } from "react";
import { LogoutBtn, ModuleCard, StudentCard } from "../../components";
import { Header } from "../../components/Header";
import { useApiContext } from "../../hooks/useApiDataContext";
import { useAuthContext, useFetchWithToken } from "../../hooks";
import { BASE_URL, CustomError } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../components/Grid";

export function RenderCourseDetails() {
  const { courseId } = useParams<{ courseId?: string }>();
  const { course, userList, getCourseByIdFromRouter, fetchUsersByCourseId } =
    useApiContext();

  useEffect(() => {

    if(courseId) {
       getCourseByIdFromRouter(courseId);
       fetchUsersByCourseId(courseId);
    }
  }, []);

  return (
    <>
      <main className="home-section">
        {/* <main className="main-container"> */}
        <Header />
        <p className="title">{course?.name}</p>
        <div className="section-container">
          <Grid>
            <div className="col-sm">
              <p className="sub-tit">Modules List</p>
              {course && course.modules && course.modules.length > 0 ? (
                course.modules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))
              ) : (
                <p>No modules available.</p>
              )}
            </div>
          </Grid>

          <Grid>
            <div className="col-sm">
              <p className="sub-tit">Students List</p>
              {userList && userList.length > 0 ? (
                userList.map((user) => (
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
            </div>
          </Grid>
        </div>
        {/* <div className="section-container">
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
            {userList && userList.length > 0 ? (
              userList.map((user) => (
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
        </div> */}
        <LogoutBtn />
      </main>
    </>
  );
}
