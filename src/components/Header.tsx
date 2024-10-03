import { LogoutBtn } from "./LogoutBtn";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="navbar-container">
        <div className="navbar">
          <a className="style active" href="/teacherpage">
            Courses
          </a>
          <a className="style" href="/UserList">
            User Admin
          </a>
        </div>
        <LogoutBtn />
      </div>
    </header>
  );
}
