import { FormEventHandler, ReactElement, useState } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { RenderLoginPage } from "./render/RenderLoginPage";
import { useApiContext } from "../hooks/useApiDataContext";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, login } = useAuthContext();
  const {user} = useApiContext();
  const navigate = useNavigate();

  console.log("Log-in page started");

  if (isLoggedIn && user) {
    switch (user.role) {
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
    if(user){
    switch (user.role) {
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
