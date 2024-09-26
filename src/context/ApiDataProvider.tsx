import { createContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL, IUser, ICourses, IUserLoggedIn, addTokenToRequestInit, ITokens, CustomError } from '../utils';
import { useAuthContext } from '../hooks';
import { jwtDecode } from 'jwt-decode';
import { useFetchWithToken } from '../hooks/useFetchWithToken';

interface IApiData {
    user: IUserLoggedIn | null;
    users: IUser[] | null;
    courses: ICourses | null;
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
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [courses, setCourses] = useState<ICourses | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<IUserLoggedIn | null>(null);
    const { tokens, isLoggedIn } = useAuthContext();

    const fetchWithToken = async (url: string): Promise<any> => {
        if (!tokens) {
            throw new CustomError(401, "No tokens available for authentication.");
        }

        const requestInit: RequestInit = addTokenToRequestInit(tokens.accessToken, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = await fetch(url, requestInit);

        if (!response.ok) {
            throw new CustomError(response.status, response.statusText);
        }

        return response.json();
    };

    const fetchUsers = async () => {
        try {
            const usersData = await fetchWithToken(`${BASE_URL}/users`);
            setUsers(usersData);
        } catch (err) {
            if (err instanceof CustomError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred while fetching users.");
            }
        }
    };

    const fetchCourses = async () => {
        if (!user) return;
        
        try {
            const coursesData = await fetchWithToken(`${BASE_URL}/courses/${user.id}`);
            setCourses(coursesData);
        } catch (err) {
            if (err instanceof CustomError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred while fetching courses.");
            }
        }
    };

    useEffect(() => {
        if (tokens) {
            const decode = jwtDecode<JwtPayload>(tokens.accessToken);
            const id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            const name = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        
            setUser({ id, name, role });
        }
    }, [tokens]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUsers(); 
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn && user) {
            fetchCourses(); 
        }
    }, [user, isLoggedIn]);

    useEffect(() => {
        setLoading(!users || !courses);
    }, [users, courses]);

    return (
        <ApiDataContext.Provider value={{ user, users, courses, loading, error }}>
            {children}
        </ApiDataContext.Provider>
    );
};
