import { ReactElement, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { LoginPage } from "../pages";
import { useNavigate } from "react-router-dom";

export function LogoutBtn(): ReactElement {
  const { logout } = useAuthContext();


  
  return (
    <div id="login-status-chip">
      <div className="tooltip">
        <button className="logout-btn" onClick={logout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="tooltiptext">Click to Log-out</span>
        </button>
      </div>
    </div>
  );
}
