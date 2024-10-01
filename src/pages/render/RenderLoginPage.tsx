import { FormEventHandler, ReactElement } from "react";

interface ILoginProps {
  handleOnSubmit: FormEventHandler<HTMLFormElement>;
  username: string;
  password: string;
  setUsername: (value: React.SetStateAction<string>) => void;
  setPassword: (value: React.SetStateAction<string>) => void;
}

export function RenderLoginPage(props: ILoginProps): ReactElement {
  return (
    <main id="login-page" className="g-container">
      <h1 className="h1">University LMS Login</h1>
      <form className="login-form" onSubmit={props.handleOnSubmit}>
        <fieldset>
          <label className="lbl" htmlFor="username">
            Email
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
        </fieldset>
      </form>
    </main>
  );
}
