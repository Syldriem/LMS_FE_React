import { Link } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";

export function Header() {


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
