import { FormEventHandler, ReactElement } from "react";

interface ILoginProps {
  handleOnSubmit: FormEventHandler<HTMLFormElement>;
  username: string;
  password: string;
  error: string;
  setUsername: (value: React.SetStateAction<string>) => void;
  setPassword: (value: React.SetStateAction<string>) => void;
}

export function RenderLoginPage(props: ILoginProps): ReactElement {
  return (
    <main id="login-page" className="g-container">
      <h1 className="h1">University LMS</h1>
      <form className="login-form" onSubmit={props.handleOnSubmit}>
        <fieldset>
          <div className="hdr4-container">
            <h4 className="hdr4">Login</h4>
          </div>
          <div className="input-container">
            {props.error ? (
              <h4 style={{ color: "red" }}>{props.error}</h4>
            ) : (
              <div></div>
            )}
            <label className="lbl" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              onChange={(e) => props.setUsername(e.target.value)}
              type="text"
              value={props.username}
            />
            <label className="lbl" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              onChange={(e) => props.setPassword(e.target.value)}
              type="password"
              value={props.password}
            />
            <button className="sign_in" type="submit">
              Sign In
            </button>
            {/*<a className="forgot" href="">
            Forgot password?
            </a>*/}
          </div>
        </fieldset>
      </form>
    </main>
  );
}
