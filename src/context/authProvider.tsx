import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  CustomError,
  IAuthContext,
  ITokens,
  loginReq,
  roleJsonFromToken,
  TOKENS,
} from "../utils";
import { useLocalStorage } from "usehooks-ts";

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const [userRole, setUserRole] = useState<string>("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  console.log("Entered AuthProvider component");
  
  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);
      console.log("Login tokens received :", tokens);

    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
      }
    }
  }
  
  function logout() {
    clearTokens();
  }
  
  useEffect(() => {
    if (tokens === null) setIsLoggedIn(false);
    if (tokens) setIsLoggedIn(true);
  }, [tokens]);
  
  useEffect(() => {
    if (tokens) {
      const role = roleJsonFromToken(tokens?.accessToken);
      setUserRole(role);
      console.log("userRole extracted from access token is: ", role);
    } else {
      setUserRole("No access token available");
    }
    [tokens, userRole];
  });
  
  const values: IAuthContext = { isLoggedIn, login, logout, userRole };

    console.log(
      "In authcontext the userRole is now set to :",values.userRole,". The log-status is set to :",values.isLoggedIn,".");
    

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
