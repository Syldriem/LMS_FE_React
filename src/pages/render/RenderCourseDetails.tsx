import { useEffect } from "react";
import { LogoutBtn, ModuleCard, StudentCard } from "../../components";
import { Header } from "../../components/Header";
import { useApiContext } from "../../hooks/useApiDataContext";
import { useAuthContext, useFetchWithToken } from "../../hooks";
import { BASE_URL, CustomError } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../components/Grid";
import {  AddModuleModal } from "../../components/AddModuleModal";
import '../../css/RenderCourseDetails.css'
import { ModalAddNewModule } from "../../components/ModalAddNewModule";

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
        <Header />
        
        <p className="title">{course?.name}</p>
        

          <Grid>
          <AddModuleModal />
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
