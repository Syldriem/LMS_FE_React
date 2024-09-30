import { FormEventHandler, ReactElement, useState } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";

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
    <main id="login-page" className="g-container">
      <h1 className="h1">University LMS Login</h1>
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <label className="lbl" htmlFor="username">Username</label>
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
