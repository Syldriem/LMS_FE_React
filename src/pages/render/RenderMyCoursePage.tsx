import { ReactElement, useContext, useEffect } from "react";
import { ICourses, IUser, IUserLoggedIn } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
import { ModuleCard } from "../../components/ModuleCard";
import { StudentCard } from "../../components/StudentCard";
import "../../css/MyCoursePage.css"
import { ApiDataContext } from "../../context/ApiDataProvider";

interface renderMyCoursePageProps {
  course: ICourses | null;
  users: IUser[] | null;
  user: IUserLoggedIn | null;
}

export function RenderMyCoursePage({
  course,
  users,
  user,
}: renderMyCoursePageProps): ReactElement {

  const { fetchUsersByCourse, userList } = useContext(ApiDataContext);

  useEffect(() => {
    fetchUsersByCourse()
  }, [userList]);

  return (
    <main className="home-section">
      <p className="title">{course?.name}</p>
      <p className="student-identity">{user?.name}</p>
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
          {userList && userList.length > 0 ? (
            userList.map((user) => (
              <StudentCard key={user.id} student={{ userName: user.userName, email: user.email}} />
            ))
          ) : (
            <p>No students available.</p>
          )}
        </section>

        <LogoutBtn />
      </div>
    </main>
  );
}
