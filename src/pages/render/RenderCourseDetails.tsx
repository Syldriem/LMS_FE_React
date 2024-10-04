import { useEffect } from "react";
import { LogoutBtn, ModuleCard, StudentCard } from "../../components";
import { Header } from "../../components/Header";
import { useApiContext } from "../../hooks/useApiDataContext";
import { Grid } from "../../components/Grid";
import { AddModuleButton } from "../../components/AddModuleButton";
import '../../css/RenderCourseDetails.css'

export function RenderCourseDetails() {
  const { course, userList, getCourseById, fetchUsersByCourse } = useApiContext();

  useEffect(() => {
    getCourseById();
    fetchUsersByCourse();
  }, []);

  return (
    <>
      <main className="home-section">
        <Header />
        
        <p className="title">{course?.name}</p>
        

          <Grid>
          <AddModuleButton className="mb-4" />
            <div className="row">
              
              {course && course.modules && course.modules.length > 0 ? (
                course.modules.map((module) => (
                  <div key={module.id} className="col-sm-4 mb-3">
                    <ModuleCard module={module} />
                  </div>
                ))
              ) : (
                <p>No modules available.</p>
              )}
            </div>
          </Grid>
        
        <Grid>
            <div>
              <p className="sub-tit">Students</p>
              {userList && userList.length > 0 ? (
                userList.map((user) => (
                  <div key={user.id} className="col-12 mb-3">
                    <StudentCard
                      student={{
                        id: user.id,
                        userName: user.userName,
                        email: user.email,
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No students available.</p>
              )}
            </div>
          </Grid>

        <LogoutBtn />
      </main>
    </>
  );
}
