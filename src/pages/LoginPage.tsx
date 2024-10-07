import { FormEventHandler, ReactElement, useEffect, useState } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { RenderLoginPage } from "./render/RenderLoginPage";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { isLoggedIn, login, user } = useAuthContext();
  const navigate = useNavigate();

  console.log("Role", user?.role);
  // Redirect logged-in users to their respective page based on their role
  useEffect(() => {
    if (isLoggedIn && user) {
      // Redirect based on user role
      switch (user.role) {
        case "teacher":
          navigate("/teacherpage"); // Redirect teacher to teacher page
          break;
        case "student":
          navigate("/mycoursepage"); // Redirect student to their course page
          break;
        default:
          navigate("/unauthorized"); // For any other roles, redirect to unauthorized
          break;
      }
    }
  }, [isLoggedIn, user, navigate]);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const errorMessage = await login(username, password); // Perform login action
    if (errorMessage && "message" in errorMessage) {
      setError(errorMessage.message);
    }

    // After login, redirect the user based on their role
    if (isLoggedIn && user) {
      switch (user.role) {
        case "teacher":
          navigate("/teacherpage"); // Redirect teacher to teacher page
          break;
        case "student":
          navigate("/mycoursepage"); // Redirect student to their course page
          break;
        default:
          navigate("/unauthorized"); // For any other roles, redirect to unauthorized
          break;
      }
    }
  };

  // If user is already logged in, skip the login form and redirect to the appropriate page
  if (isLoggedIn && user) {
    return (
      <Navigate
        to={user.role === "teacher" ? "/teacherpage" : "/mycoursepage"}
      />
    );
  }

  return (
    <RenderLoginPage
      handleOnSubmit={handleOnSubmit}
      password={password}
      setPassword={setPassword}
      setUsername={setUsername}
      username={username}
      error={error}
    />
  );
}
