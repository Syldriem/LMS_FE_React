import { ReactElement, useState } from "react";
import { ICourses, IUser, IUserCourse } from "../../utils";
import { ModalPopupCreateUser } from "../../components/ModalPopupCreateUser";
import { Header } from "../../components/Header";

interface RenderMyCoursePageProps {
  courses: IUserCourse[] | null;
  course: ICourses[] | null;
  users: IUser[] | null;
  deleteUser: (userId: string) => Promise<void>;
}
export function RenderUserListPage({
  users,
  courses,
  course,
  deleteUser

}: RenderMyCoursePageProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      console.log(userId)
      await deleteUser(userId); 
    } catch (error) {
      console.error("Error deleting user:", error);

    }
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
      <div className="main-content">
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="contain">
          <div className="sidebar mb-3">
            <div className="d-flex flex-column">
              <input
                type="text"
                placeholder="Search by username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input mb-2"
              />
              <div className="filter">
                <label htmlFor="filterSelect" className="form-label">Filter</label>
                <select
                  id="filterSelect"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="form-select"
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
            {/* User List */}
            <div className="user-list mt-2">
              {filteredUsers && filteredUsers.length > 0 ? (
                <ul className="list-group">
                  {filteredUsers.map((user) => {
                    console.log(user); // Log the user object to verify its structure
                    const userCourse = courses?.find(
                      (course) => course.userName === user.userName
                    );
                    return (
                      <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-bold">{user.userName}</span>
                          <span className="ms-2">{userCourse?.courseName}</span>
                          <span className="badge bg-secondary ms-2">{user.role}</span>
                        </div>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </li>
                    );
                  })}
                </ul>
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
