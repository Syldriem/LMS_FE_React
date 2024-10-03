import { ReactElement } from "react";
import { ICourses, IUser } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
import { ModuleCard } from "../../components/ModuleCard";
import { StudentCard } from "../../components/StudentCard";
import { Grid } from "../../components/Grid";
interface renderMyCoursePageProps {
  course: ICourses | null;
  users: IUser[] | null;
}

export function RenderMyCoursePage({
  course,
  users,
}: renderMyCoursePageProps): ReactElement {
  return (
    <main className="home-sections">
      <p className="title">{course?.name}</p>
      <div className="section-container text-center">
        <Grid>
          <div className="col-sm">
            <p className="sub-tit">Modules List</p>
            {course && course.modules && course.modules.length > 0 ? (
              course.modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))
            ) : (
              <p>No modules available</p>
            )}
          </div>
        </Grid>
        <Grid>
          <div className="col-sm">
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
          </div>
        </Grid>
        {/* <section className="module-section">
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
        </section> */}
      </div>
      <LogoutBtn />
    </main>
  );
}
