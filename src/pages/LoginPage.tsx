import { FormEventHandler, ReactElement, useState, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { hasTokenExpired } from "../utils";
import { RenderLoginPage } from "./render/RenderLoginPage";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, login } = useAuthContext();

  const navigate = useNavigate();

  //const tokenIsExpired: boolean = hasTokenExpired(tokens!.accessToken);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/mycoursepage");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login(username, password);
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
