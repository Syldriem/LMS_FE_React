import { ReactElement, useContext } from "react";
import { ModuleCard } from "../components/ModuleCard";
import { StudentCard } from "../components/StudentCard";
import "../css/MyCoursePage.css";
import { ApiDataContext } from "../context/ApiDataProvider";

export function MyCoursePage(): ReactElement {
  const { filterUsersByCourseAndRole, courses, loading, error } =
    useContext(ApiDataContext);
  //const [selectedRole] = useState<string>();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredUsers = filterUsersByCourseAndRole(
    "8cff3840-cc81-4791-f588-08dcdb164444",
    "Student"
  );

  return (
    <main className="home-section">
      <p className="title">{courses[0].name}</p>
      <div className="doc-btn-contanier">
        <button className="btn-layout">Documents</button>
      </div>
      <div className="section-container">
        <section className="module-section">
          <p className="sub-tit">Modules List</p>
          <ModuleCard modules={courses[0].modules} />
        </section>
        <section className="students-section">
          <p className="sub-tit">Students List</p>
          <StudentCard students={filteredUsers} />
        </section>
      </div>
    </main>
  );
}
