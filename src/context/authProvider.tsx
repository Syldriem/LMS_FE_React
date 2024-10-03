import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { hasTokenExpired, IAuthContext, loginReq } from "../utils";
import { useLocalStorage } from "../hooks/useTokenStorage";

interface IAuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const { tokens, setTokens, clearTokens } = useLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (tokens && tokens.accessToken && !hasTokenExpired(tokens.accessToken)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [tokens]);
  const login = async (username: string, password: string): Promise<void> => {
    try {
      const newTokens = await loginReq(username, password);
      setTokens(newTokens); 
      setIsLoggedIn(true);    
    } catch (error) {
      console.error("Login failed", error);
      setIsLoggedIn(false);
    }
  };

  const logout = (): void => {
    console.log("TEST")
    clearTokens();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ tokens, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
