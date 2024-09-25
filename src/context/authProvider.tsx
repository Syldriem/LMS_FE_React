import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { CustomError, hasTokenExpired, IAuthContext, ITokens, IUserLoggedIn, loginReq, refreshTokens, TOKENS } from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(TOKENS, null);
  
  const values: IAuthContext = { tokens, isLoggedIn, login, logout };

  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
      }
    }
  }

  function logout() {
    clearTokens();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const handleTokenExpiry = async () => {
      if (tokens) {
        const accessTokenExpired = hasTokenExpired(tokens.accessToken);

        if (accessTokenExpired) {
          if (tokens.refreshToken && !hasTokenExpired(tokens.refreshToken)) {
            // Attempt to refresh tokens
            try {
              const refreshedTokens = await refreshTokens(tokens.accessToken, tokens.refreshToken);
              setTokens(refreshedTokens);
              setIsLoggedIn(true);
            } catch (error) {
              console.log("Failed to refresh token:", error);
              logout(); // Log out if token refresh fails
            }
          } else {
            // If no valid refresh token, log out
            logout();
          }
        } else {
          // Token is still valid
          setIsLoggedIn(true);
        }
      } else {
        // No tokens, user is not logged in
        setIsLoggedIn(false);
      }
    };

    handleTokenExpiry();
  }, [tokens]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
