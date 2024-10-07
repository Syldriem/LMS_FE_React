import { NavLink } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import { useContext } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";

export function Header() {
  const { user } = useContext(ApiDataContext);
  
  if (user?.role === "teacher") {
    return (
      <header className="header-container">
        <div className="navbar-container">
          <div className="navbar">
            <NavLink 
              className={({ isActive }) => isActive ? 'style active' : 'style'} 
              to="/teacherpage"
            >
              Courses
            </NavLink>
            <NavLink 
              className={({ isActive }) => isActive ? 'style active' : 'style'} 
              to="/mycoursepage"
            >
              My Course
            </NavLink>
            <NavLink 
              className={({ isActive }) => isActive ? 'style active' : 'style'} 
              to="/userlist"
            >
              User Admin
            </NavLink>
          </div>
          <LogoutBtn />
        </div>
      </header>
    );
  }

  // Return null or an empty fragment if the user doesn't have access
  return null;
}
