import { ReactElement } from "react";
import { useAuthContext } from "../hooks";
import { LoginPage } from "../pages";

export function LogoutBtn(): ReactElement {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <div>
         
      {isLoggedIn ? 
      (<div className="logout-tip">
        <button className="logout-btn" onClick={logout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="tiptext">Click to Log-out</span>
        </button>
      </div>) : (<LoginPage/>)}
    </div>
  );
}
