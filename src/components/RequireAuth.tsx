import { ReactElement, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { Navigate } from "react-router-dom";
import { useApiContext } from "../hooks/useApiDataContext";

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  console.log("selecting the page to render in RequireAuth component");
  const { isLoggedIn } = useAuthContext();
  const { user } = useApiContext();

  useEffect(() => {
    if (user?.role) {
      console.log("roleType updated/changed");
    }
    [user?.role];
  });

  console.log(
    "logged-in: ",
    isLoggedIn,
    " my authContext userRole is: ",
    user?.role
  );

  /*if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }*/

  if ((user?.role ?? "").toLowerCase() === "teacher") {
    console.log("I'm a teacher");
    return children;
  }

  if ((user?.role ?? "").toLowerCase() === "student") {
    console.log("I'm a student");
    return children;
  }

  if ((user?.role ?? "").toLowerCase() === "guest") {
    console.log("I'm an imposter");
    return <Navigate to="/unauthorized" replace />;
  }
  console.log(
    "roleType is not defined or empty so here is an unauthorized page"
  );
  return <Navigate to="/login" replace />;
}
