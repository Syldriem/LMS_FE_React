import { FormEventHandler, ReactElement, useState, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { hasTokenExpired } from "../utils";
import { RenderLoginPage } from "./render/RenderLoginPage";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, login, userRole } = useAuthContext();
  const navigate = useNavigate();

  console.log("Log-in page started");

  if (isLoggedIn) {
    switch (userRole.toLowerCase()) {
      case "teacher":
        return <Navigate to="/teacherpage" replace />;
      case "student":
        return <Navigate to="/mycoursepage" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login(username, password);

    switch (userRole.toLowerCase()) {
      case "teacher":
        navigate("/teacherpage");
        break;
      case "student":
        navigate("/mycoursepage");
        break;
      default:
        navigate("/unauthorized");
        break;
    }  
  };
  
  return (
    <RenderLoginPage
      handleOnSubmit={handleOnSubmit}
      password={password}
      setPassword={setPassword}
      setUsername={setUsername}
      username={username}
    />

  );
}
