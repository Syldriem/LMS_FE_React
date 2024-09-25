import { ReactElement, useContext } from "react";
import { ModuleCard } from "../components/ModuleCard";
import { StudentCard } from "../components/StudentCard";
import "../css/MyCoursePage.css"
import { ApiDataContext } from "../context/ApiDataProvider"

export function MyCoursePage() : ReactElement {

    const { filterUsersByCourseAndRole, courses, loading, error } = useContext(ApiDataContext);
    //const [selectedRole] = useState<string>();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    const filteredUsers = filterUsersByCourseAndRole('db843cae-a03a-4f63-df10-08dcdba00c1e', 'Student');




    return(
        <main className="home-section">
            <p className="title">{courses[0].name}</p>
            <div className="doc-btn-contanier">
                <button className="btn-layout">Documents</button>
            </div>
            <div className="section-container">
                <section className="module-section">
                    <p className="sub-tit">Modules List</p>
                    <ModuleCard key={courses[0].Id}  modules={courses[0].modules}/>
                </section>
                <section className="students-section">
                    <p className="sub-tit">Students List</p>
                    <StudentCard key="1" students={filteredUsers} />
                </section>
            </div>
        </main>
    );

    
    
    
}