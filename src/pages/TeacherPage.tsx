import { MouseEventHandler, ReactElement, useEffect, useState } from "react";
import "../css/index.css";
import { RenderCourseList } from "./render/RenderCourseList";
import { ModalPopup } from "../components/ModalPopup";
import { Header } from "../components/Header";


export function TeacherPage(): ReactElement {

  const [showModal, setShowModal] = useState(false); // Modal visibility state


  const handleOnAddCourse: MouseEventHandler<HTMLButtonElement> = (): void => {
    setShowModal(true); 
  };

  return (
    <>

    <main className="home-section">
      <Header />

      <RenderCourseList />
      <button className="course-btn-layout" onClick={handleOnAddCourse}>
          Add Course
        </button>
      <ModalPopup show={showModal} setShow={setShowModal} />
      <div className="course-btn-container">

      </div>
    </main>
    </>
  );
}
