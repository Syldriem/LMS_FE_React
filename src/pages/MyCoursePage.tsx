import { ReactElement } from "react";
import { ModuleCard, StudentCard, LogoutBtn } from "../components";
import "../css/index.css";









export function MyCoursePage() : ReactElement {
return (
      <main className="home-section">
        <h1 className="header">Student's Name Page</h1>
          <LogoutBtn />
        <p className="title">Course Title</p>
        <div className="doc-btn-contanier">
          <button className="btn-layout">Documents</button>
        </div>
        <div className="section-container">
          <section className="module-section">
            <p className="sub-tit">Modules List</p>
            <ModuleCard />
            <ModuleCard />
            <ModuleCard />
          </section>
          <section className="students-section">
            <p className="sub-tit">Students List</p>
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
          </section>
        </div>
      </main>
    );

    
    
    
}