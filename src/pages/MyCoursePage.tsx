import { useContext, useEffect, useState } from "react";
import { StudentCard } from '../components/StudentCard';
import { ModuleCard } from '../components/ModuleCard';
import { ApiDataContext  } from "../context/ApiDataProvider"; 
import { useAuthContext, useFetchWithToken } from "../hooks";
import { BASE_URL, hasTokenExpired, ICourses, IUser } from "../utils";
import { LogoutBtn } from "../components";
import '../css/MyCoursePage.css'
import { useNavigate } from "react-router-dom";
export function MyCoursePage() {
    const { user, users, courses } = useContext(ApiDataContext);
    const { isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            console.log("Test")
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    return (
        <main className="home-section">
        <p className="title">{courses?.name}</p>
        <div className="doc-btn-contanier">
          <button className="btn-layout">Documents</button>
        </div>
        <div className="section-container">
          <section className="module-section">
            <p className="sub-tit">Modules List</p>
            {courses && courses.modules && courses.modules.length > 0 ? (
            courses.modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
            ))
        )    : (
            <p>No modules available.</p>
            )}
            
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
                            email: user.email 
                        }}
                    />
                ))
            ) : (
                <p>No students available.</p>
            )}
        </section>

          <LogoutBtn></LogoutBtn>
        </div>
      </main>
    );
}
