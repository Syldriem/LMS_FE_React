import { LogoutBtn } from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();


  return (
    <header className="header-container">
      <div className="navbar-container">
        <div className="navbar">
          <Link className="style active" to="/teacherpage">
            Courses
          </Link>
          <Link className="style" to={'/userlist'}>
            User Admin
          </Link>
        </div>
        <LogoutBtn />
      </div>
    </header>
  );
}
