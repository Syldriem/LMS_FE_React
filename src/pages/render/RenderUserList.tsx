import { ReactElement, useState } from "react";
import { IUser, IUserCourse } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
import { ModalPopupCreateUser } from "../../components/ModalPopupCreateUser";

interface RenderUserListPageProps {
  courses: IUserCourse[] | null;
  users: IUser[] | null;
}

export function RenderUserListPage({
  users,
  courses,
}: RenderUserListPageProps): ReactElement {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  
  return (
    <div className="container">
      <div className="header">
        <div className="tabs">
          <button className="tab">Courses</button>
          <button className="tab">Users</button>
        </div>
        <LogoutBtn />
      </div>

      <div className="content">
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
              users.map((user) => {
                const userCourse = courses?.find(course => course.userName === user.userName);
                return (
                  <div key={user.id} className="user-item">
                    <span>{user.userName}</span>
                    <span>{userCourse?.courseName}</span>
                    <span>{user.role}</span>
                  </div>
                );
              })
            ) : (
              <p>No students available.</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <button className="create-user-button" onClick={openModal}>
          Create User
        </button>

      </div>
      <ModalPopupCreateUser show={showModal} setShow={setShowModal}></ModalPopupCreateUser>
    </div>
  );
}

