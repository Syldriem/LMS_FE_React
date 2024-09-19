import { ReactElement } from "react";
import { useAuthContext } from "../hooks";
import { LoginPage } from "../pages";

export function LogoutBtn(): ReactElement {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <div id="login-status-chip">
         
      {isLoggedIn ? 
      (<div className="tooltip">
        <button className="logout-btn" onClick={logout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="tooltiptext">Click to Log-out</span>
        </button>
      </div>) : (<LoginPage/>)}
    </div>
  );
}
