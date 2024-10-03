import { ReactElement, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { LoginPage } from "../pages";
import { useNavigate } from "react-router-dom";

export function LogoutBtn(): ReactElement {
  const { logout } = useAuthContext();
  const navigate = useNavigate();  // Get the navigate function

  const handleLogout = () => {
    logout();  // Call logout
    navigate("/login");  // Redirect to login after logout
  };
  
  return (
    <div>    
      <div className="logout-tip">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="tiptext">Click to Log-out</span>
        </button>
      </div>
    </div>
  );
}
