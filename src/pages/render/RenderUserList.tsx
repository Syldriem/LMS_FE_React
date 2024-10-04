import { ReactElement, useState } from "react";
import { ICourses, IUser, IUserCourse, IUserLoggedIn } from "../../utils";
import { LogoutBtn } from "../../components/LogoutBtn";
import { ModalPopupCreateUser } from "../../components/ModalPopupCreateUser";
import { Header } from "../../components/Header";

interface RenderMyCoursePageProps {
  courses: IUserCourse[] | null;
  course: ICourses[] | null;
  users: IUser[] | null;
  user: IUserLoggedIn | null;
}
export function RenderUserListPage({
  users,
  courses,
  course,
}: RenderMyCoursePageProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const filteredUsers =
    users?.filter((user) => {
      const matchesSearch = user.userName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCourse = selectedCourse
        ? user.courseID === selectedCourse
        : true;
      return matchesSearch && matchesCourse;
    }) || [];

  return (
    <div>
      <div className="header-wrapper">
        <Header />
      </div>
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
                {course && course.length > 0 ? (
                  course.map((courses) => (
                    <option key={courses.id} value={courses.id}>
                      {courses.name}
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
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const userCourse = courses?.find(
                  (course) => course.userName === user.userName
                );
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

        <div className="btn-create">
          <button className="create-user-button" onClick={openModal}>
            Create User
          </button>
        </div>
      </div>
      <ModalPopupCreateUser
        show={showModal}
        setShow={setShowModal}
      ></ModalPopupCreateUser>
    </div>
  );
}
