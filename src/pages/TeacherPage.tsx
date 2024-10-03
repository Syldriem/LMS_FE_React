import { MouseEventHandler, ReactElement, useEffect, useState } from "react";
import { ModuleCard, StudentCard, LogoutBtn, CourseCard } from "../components";
import "../css/index.css";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { RenderCourseList } from "./render/RenderCourseList";
import { ModalPopup } from "../components/ModalPopup";
import { Header } from "../components/Header";


export function TeacherPage(): ReactElement {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleOnAddCourse: MouseEventHandler<HTMLButtonElement> = (): void => {
    setShowModal(true); // Show the modal
  };


  return (
    <main className="home-section">
      <Header />
      <div className="course-btn-container">
        <button className="course-btn-layout" onClick={handleOnAddCourse}>
          Add Course
        </button>
      </div>
      <RenderCourseList />
      <ModalPopup show={showModal} setShow={setShowModal} />
    </main>
  );
}
