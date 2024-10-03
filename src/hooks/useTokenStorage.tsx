import { useState, useEffect } from "react";

// Define a constant key for localStorage
const TOKEN_KEY = "auth_tokens";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export const useLocalStorage = () => {
  const [tokens, setTokensState] = useState<ITokens | null>(() => {
    const storedTokens = localStorage.getItem(TOKEN_KEY);
    return storedTokens ? JSON.parse(storedTokens) : null;
  });

  const setTokens = (newTokens: ITokens | null) => {
    setTokensState(newTokens);
    if (newTokens) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const clearTokens = () => {
    setTokensState(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return { tokens, setTokens, clearTokens };
};
