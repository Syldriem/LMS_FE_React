import { ReactElement, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { LoginPage } from "../pages";
import { useNavigate } from "react-router-dom";

export function LogoutBtn(): ReactElement {
  const { logout } = useAuthContext();


  
  return (
    <div>    
      <div className="logout-tip">
        <button className="logout-btn" onClick={logout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="tiptext">Click to Log-out</span>
        </button>
      </div>
    </div>
  );
}
