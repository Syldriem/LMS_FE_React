import { ReactElement } from "react";
import { ICourses, IUser, IUserLoggedIn } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
import { ModuleCard } from "../../components/ModuleCard";
import { StudentCard } from "../../components/StudentCard";
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
  return (
    <main className="home-sections">
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
        <section id="spinner" hidden>
          <div className="loader"></div>
        </section>
        <section key={user?.id} className="students-section">
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

        <LogoutBtn />
      </div>
    </main>
  );
}
