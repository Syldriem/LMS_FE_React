import { ReactElement, useState } from "react";
import { ICourses, IUser, IUserLoggedIn } from "../../utils";
import { Header } from "../../components/header";

interface RenderMyCoursePageProps {
    courses: ICourses[] | null;
    users: IUser[] | null;
    user: IUserLoggedIn | null;
}

export function RenderUserListPage({
    users,
    courses,
}: RenderMyCoursePageProps): ReactElement {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCourse, setSelectedCourse] = useState<string>('');

    const filteredUsers = users?.filter(user => {
        const matchesSearch = user.userName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = selectedCourse ? user.courseID === selectedCourse : true;
        return matchesSearch && matchesCourse;
    }) || [];

    return (
        <div>
            <Header />
            <div className="contain">
                <div className="sidebar">
                    <div>
                        <input
                            type="text" 
                            placeholder="Search by username" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <div className="filter">
                            <label htmlFor="filterSelect">Filter</label>
                            <select 
                                id="filterSelect" 
                                value={selectedCourse} 
                                onChange={(e) => setSelectedCourse(e.target.value)} 
                            >
                                <option value="">Select a course</option>
                                {courses && courses.length > 0 ? (
                                    courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="none">No courses available</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="main-content">
                    <div className="user-list-header">
                        <span>Username</span>
                        <span>Course/Module</span>
                        <span>Role</span>
                    </div>
                    
                    <div className="user-list">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => {
                                const userCourse = courses?.find(
                                    (course) => course.id === user.courseID
                                );
                                
                                return (
                                    <div key={user.id} className="user-item">
                                        <span>{user.userName}</span>
                                        <span>{userCourse ? userCourse.name : " "}</span>
                                        <span>{user.role}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No students available.</p>
                        )}
                    </div>

                </div>
                
                <div className="btn-create">
                    <button className="create-user-button">Create User</button>
                </div>
            </div>
        </div>
    );
}
