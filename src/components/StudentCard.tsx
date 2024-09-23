import { ReactElement } from "react";

import "../css/StudentCard.css"


interface IStudentListProps {
    students: any[];
  }

export function StudentCard({ students }: IStudentListProps): ReactElement {

    console.log(students);
    
    return (
        <div>
        {students ? (
        students.map((u) => (
        <span key={u.id} className="card-st">
            <p className="title-card-src">{u.userName}</p>
            <div className="desc">
                <p className="cat-lbl">E-mail:</p>
                <p className="spec-lbl">{u.email}</p>
            </div>
        </span>
        ))
        ) : (
        <p>No Users</p>
        )}
        </div> 
    );
}