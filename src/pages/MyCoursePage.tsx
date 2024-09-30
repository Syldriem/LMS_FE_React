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
    const { user } = useContext(ApiDataContext);
    const { isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    const {data: users, requestFunc: requestFuncUser} = useFetchWithToken<IUser[]>(
        `${BASE_URL}/users`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        }
    )

    const { data: course, requestFunc: requestFuncCourse } = useFetchWithToken<ICourses>(
        `${BASE_URL}/courses/${user?.id}`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return; 
        }

        if (!users) {
            requestFuncUser();
        }

        if (user?.id && !course) {
            requestFuncCourse();
        } else if (!user) {
            console.error("User ID is undefined");
        }
    }, [isLoggedIn, navigate, user, users, course ]);
    

    

    //const modules = courses.flatMap(course => course.modules);

    return (
        <>
            <main className="home-section">
            <p className="title">{course?.name}</p>
            <div className="doc-btn-contanier">
            <button className="btn-layout">Documents</button>
            </div>
            <div className="section-container">
            <section className="module-section">
                <p className="sub-tit">Modules List</p>
                {course?.modules.map((module)=>(
                    <ModuleCard key={module?.id} module = {module} 
                />

                ))}
                
            </section>
            <section key={user.id}  className="students-section">
                <p key={user.id} className="sub-tit">Students List</p>
                {users && users.map((user) => (
                    <StudentCard 
                    key={user.id} 
                    student={{ 
                    id: user.id, 
                    userName: user.userName, 
                    email: user.email 
                }}/>
            ))}
            </section>

            <LogoutBtn></LogoutBtn>
            </div>
        </main>
    </>
   
    );
}
