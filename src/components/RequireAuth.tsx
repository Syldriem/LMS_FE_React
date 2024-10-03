import { ReactElement, useEffect, useState } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useApiContext } from "../hooks/useApiDataContext";
import { hasTokenExpired } from "../utils";

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { isLoggedIn, tokens, logout } = useAuthContext();
  const { user } = useApiContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const storedToken = tokens?.accessToken || sessionStorage.getItem('userToken');
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // Check if the token is valid and the user is logged in
    if (!storedToken || !storedIsLoggedIn) {
      navigate("/login");
      return;
    }

    // Simulate a delay while checking user info (can be skipped if you prefer)
    setIsLoading(false);

    // Optionally, set user role and token to context here (if needed)
  }, [tokens, navigate]);

  useEffect(() => {
    // Redirection to the last path after login, if available
    const lastPath = sessionStorage.getItem("lastPath");
    if (lastPath && !isLoading) {
      navigate(lastPath);
    }
  }, [navigate, isLoading]);

  // If still loading, return loading indicator (optional)
  if (isLoading) {
    return <div>Loading...</div>; // You can customize this
  }

  // If user is logged in and has a valid role (teacher/student), render the protected content
  if (isLoggedIn && user && (user.role === "teacher" || user.role === "student")) {
    return children;
  }



  // If the user is not logged in or the role is unauthorized, redirect to login or unauthorized page
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
}
