import { LogoutBtn } from "./LogoutBtn";

export function Header() {
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
