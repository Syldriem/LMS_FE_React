import { FormEventHandler, ReactElement, useState } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, login } = useAuthContext();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await login(username, password);
    navigate("/");
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
