import { ReactElement } from "react";
import { ICourses, IUser, IUserLoggedIn } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
interface renderMyCoursePageProps {
  courses: ICourses | null;
  users: IUser[] | null;
  user: IUserLoggedIn | null;
}

export function RenderUserListPage({
  users,
  courses
  //user,
}: renderMyCoursePageProps): ReactElement {

  return (
    <div className="container">
        <div className="header">
            <div className="tabs">
                <button className="tab">Courses</button>
                <button className="tab">Users</button>
            </div>
            <LogoutBtn></LogoutBtn>
        </div>

        <div className="content  ">
            <div className="sidebar">
                <button className="search-button">Search?</button>
                <div className="filter">
                    <label htmlFor="filterSelect">Filter</label>
                    <select id="filterSelect">
                        <option value="value">Value</option>
                    </select>
                </div>
            </div>

            <div className="main-content">
                <div className="user-list-header">
                    <span>Username</span>
                    <span>Course/Module</span>
                    <span>Role</span>
                </div>
                <div className="user-list">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="user-item">
                                <span>{user.userName}</span>
                                <span>{courses?.name}</span>
                                <span>{user.courseID}</span>
                                <span>{user.role}</span>
                            </div>
                        ))
                    ) : (
                        <p>No students available.</p>
                    )}
                </div>
                </div>
            </div>
            <div >
                <button className='create-user-button'>Create User</button>
            </div>
        </div>

  );
}
