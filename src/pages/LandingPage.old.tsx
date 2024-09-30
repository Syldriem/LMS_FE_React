import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { LogoutBtn } from "../components";

export function LandingPage(): ReactElement {
  return (
    <main id="landing-page" className="g-container">
      <h1 className="header">User Role Page</h1>
      <LogoutBtn />
      <Outlet />
    </main>
  );
}
