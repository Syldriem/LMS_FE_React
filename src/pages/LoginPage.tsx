import { FormEventHandler, ReactElement, useState, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { hasTokenExpired } from "../utils";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, login,tokens } = useAuthContext();

  const navigate = useNavigate();

  //const tokenIsExpired: boolean = hasTokenExpired(tokens!.accessToken);

  useEffect(() => {
    if (isLoggedIn===true) {
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
    <main id="login-page" className="g-container">
      <h1 className="h1">University LMS Login</h1>
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <label className="lbl" htmlFor="username">Email</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
          />
          <label className="lbl" htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <button className="sign_in" type="submit">
            Sign In
          </button>
          <a className="forgot" href="">Forgot password?</a>
        </fieldset>
      </form>
    </main>
  );
}
