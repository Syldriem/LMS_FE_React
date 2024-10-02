import { LogoutBtn } from "./LogoutBtn";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="navbar-container">
        <div className="navbar">
          <a className="style active" href="#courses">
            Courses
          </a>
          <a className="style" onClick={(e) => {
            e.preventDefault()
            navigate("/userlist"); 
          }}
            href="#"
          >
            User Admin
          </a>
        </div>
        <LogoutBtn />
      </div>
    </header>
  );
}
