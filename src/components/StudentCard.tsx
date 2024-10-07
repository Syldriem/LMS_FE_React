import { ReactElement } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface IStudentProps {
  student: {
    //id: string;
    userName: string;
    email: string;
  };
}

export function StudentCard({ student }: IStudentProps): ReactElement {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">

          <div className="col-6">
            <h5 className="card-title">{student.userName}</h5>
          </div>
          

          <div className="col-7">
            <h6 className="card-subtitle text-muted">Email</h6>
            <p className="card-text">{student.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
