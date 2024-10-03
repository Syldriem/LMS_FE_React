import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { CustomError, hasTokenExpired, IAuthContext, ITokens, IUserLoggedIn, loginReq, refreshTokens, roleJsonFromToken, TOKENS } from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface IAuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
 
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const values: IAuthContext = {
    tokens, isLoggedIn, login, logout
  };

  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);  // Save tokens in localStorage or useLocalStorage
      console.log("Login tokens received:", tokens);
  
      // Check if tokens are valid (not expired, etc.)
      if (tokens.accessToken && !hasTokenExpired(tokens.accessToken)) {
        setIsLoggedIn(true);  // Update the logged-in state only if tokens are valid
      } else {
        setIsLoggedIn(false); // In case token validation fails
      }
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
      }
      setIsLoggedIn(false);  // In case of an error, ensure the user is logged out
    }
  }
  
  useEffect(() => {
    if (isLoggedIn===true) {
      logout();
      
    }
  }, []);
  
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
              logout();
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
  
  /*useEffect(() => {
    if (tokens) {
      const role = roleJsonFromToken(tokens?.accessToken);
      setUserRole(role);
      console.log("userRole extracted from access token is: ", role);
    } else {
      setUserRole("No access token available");
    }
    [tokens, userRole];
  });*/

    

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
