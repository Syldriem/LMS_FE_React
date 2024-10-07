import { ReactElement, useContext, useEffect, useState } from "react";
import { ICourses, IUser, IUserLoggedIn } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
import { ModuleCard } from "../../components/ModuleCard";
import { StudentCard } from "../../components/StudentCard";
import "../../css/MyCoursePage.css";
import { ApiDataContext } from "../../context/ApiDataProvider";

interface renderMyCoursePageProps {
  course: ICourses | null;
  users: IUser[] | null;
  user: IUserLoggedIn | null;
}

export function RenderMyCoursePage({
}: renderMyCoursePageProps): ReactElement {
  const { fetchUsersMyCourse, fetchCourse, myCourse, userList, user, fetchUsersByCourseId } = useContext(ApiDataContext);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user && !hasFetchedData) {
        try {
          console.log(myCourse?.id)
          await fetchCourse(user.id); // This will fetch based on the user role
          await fetchUsersMyCourse(user.id); // Fetch users in the course
  
          if (myCourse?.id) {
            await fetchUsersByCourseId(myCourse.id);
          }
        } catch (error) {
          console.error("Error during fetch: ", error);
        } finally {
          setHasFetchedData(true);
        }
      }
    };
  
    fetchData();
  }, [user, hasFetchedData, myCourse, fetchCourse, fetchUsersMyCourse, fetchUsersByCourseId]);
  

  

  useEffect(() => {
    if (user && !hasFetchedData) {  // Only fetch data if the user exists and data has not been fetched
      fetchCourse(user.id)
        .then(() => {
          return fetchUsersMyCourse(user.id);
        })
        .then(() => {
          if (myCourse?.id) {
            return fetchUsersByCourseId(myCourse.id);
          }
        })
        .finally(() => {
          setHasFetchedData(true);  // Set to true after fetching data
        });
    }
  }, [user, hasFetchedData, myCourse]);


  return (
    <main className="home-section">
      {/* Course Title and User Info */}
      <p className="title">{myCourse?.name}</p>
      <p className="student-identity">{user?.name}</p>
      
      <div className="doc-btn-container mb-4">
        {/* <button className="btn-layout">Documents</button> */}
      </div>

      <section className="module-section">
        <div className="container">
          <div className="row">
            {myCourse && myCourse.modules && myCourse.modules.length > 0 ? (
              myCourse.modules.map((module) => (
                <div key={module.id} className="module-card" > {/* 3 columns layout */}
                  <ModuleCard module={module} />
                </div>
              ))
            ) : (
              <p>No modules available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Bootstrap Section for Students */}
      <section className="students-section">
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
      </section>

      {/* Logout Button */}
      <LogoutBtn />
    </main>
  );
}
