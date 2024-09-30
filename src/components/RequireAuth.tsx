import { ReactElement, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { Navigate } from "react-router-dom";

interface IRequireAuthProps {
  children: ReactElement;
  
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  
  console.log("selecting the page to render in RequireAuth component");
  const { isLoggedIn, userRole } = useAuthContext();

 
  useEffect(() => {
    if (userRole) {
      console.log("roleType updated/changed");
    }
    [userRole];
  });

  console.log(
    "logged-in: ",
    isLoggedIn,
    " my authContext userRole is: ",
    userRole
  );

  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  if ((userRole ?? "").toLowerCase() === "teacher") {
    console.log("I'm a teacher");
    return children;
  }

  if ((userRole ?? "").toLowerCase() === "student") {
    console.log("I'm a student");
    return children;
  }

  if ((userRole ?? "").toLowerCase() === "guest") {
    console.log("I'm an imposter");
    return <Navigate to="/unauthorized" replace />;
  }
  console.log(
    "roleType is not defined or empty so here is an unauthorized page"
  );
  return <Navigate to="/unauthorized" replace />;
}
