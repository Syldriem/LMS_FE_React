import { ReactElement } from "react";
import "../css/StudentCard.css";

interface IStudentProps {
  student: {
    id: string;
    userName: string;
    email: string;
  };
}

export function StudentCard({ student }: IStudentProps): ReactElement {
  return (
    <span key={student.id} className="card-st">
      <p className="title-card-src">{student.userName}</p>
      <div className="desc">
        <p className="cat-lbl">E-mail:</p>
        <p className="spec-lbl">{student.email}</p>
      </div>
    </span>
  );
}
