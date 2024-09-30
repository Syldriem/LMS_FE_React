import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { BASE_URL, IUser, ICourses, IUserLoggedIn, hasTokenExpired } from '../utils';
import { useAuthContext } from '../hooks';
import { jwtDecode } from 'jwt-decode';

export interface IApiData {
    user: IUserLoggedIn;
    users: IUser[];
    courses?: ICourses[];
    loading: boolean;
    error: string | null;
}

interface JwtPayload {
  exp: number;
  iat: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  [key: string]: any; // Index signature
}

interface ApiDataProviderProps {
    children: ReactNode;
}

export const ApiDataContext = createContext<IApiData>({} as IApiData);

export const ApiDataProvider = ({ children }: ApiDataProviderProps) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [courses, setCourses] = useState<ICourses[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    var user: IUserLoggedIn = {};
    
    
    const { tokens,isLoggedIn } = useAuthContext();

    console.log(isLoggedIn);

    if(isLoggedIn===true){
    const decode = jwtDecode<JwtPayload>(tokens?.accessToken!);
    const id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    const name = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
    user = { id, name, role };
  }

    return (
        <ApiDataContext.Provider value={{ user, users, loading, error }}>
            {children}
        </ApiDataContext.Provider>
    );
};
