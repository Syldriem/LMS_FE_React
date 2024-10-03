import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  BASE_URL,
  IUser,
  ICourses,
  IUserLoggedIn,
  addTokenToRequestInit,
  ITokens,
  CustomError,
} from "../utils";
import { useAuthContext } from "../hooks";
import { jwtDecode } from "jwt-decode";
import { useFetchWithToken } from "../hooks/useFetchWithToken";

interface IApiData {
  user: IUserLoggedIn | null;
  users: IUser[] | null;
  userList: IUser[] | null;
  course: ICourses | null;
  courses: ICourses[] | null;
  loading: boolean;
  error: string | null;
  getCourseById: () => Promise<void>;
  setCourse: React.Dispatch<React.SetStateAction<ICourses | null>>;
  createCourse: (courseDetails: { name: string; description: string; startDate: string; }) => Promise<ICourses>;
  fetchUsersByCourse: () => Promise<void>;
  fetchUsers: () => Promise<void>;
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
  const [userList, setUserList] = useState<IUser[] | null>(null);
  const [course, setCourse] = useState<ICourses | null>(null);
  const [courses, setCourses] = useState<ICourses[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUserLoggedIn | null>(null);
  
  const { tokens, isLoggedIn } = useAuthContext();

  const fetchWithToken = async (url: string, method: string = "GET", body?: any): Promise<any> => {
    if (!tokens) {
      throw new CustomError(401, "No tokens available for authentication.");
    }

    const requestInit: RequestInit = addTokenToRequestInit(tokens.accessToken, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null, // Only include body if there's data to send
    });

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      throw new CustomError(response.status, response.statusText);
    }

    return response.json();
  };

  const createCourse = async (courseDetails: { name: string; description: string; startDate: string; }): Promise<ICourses> => {
    const url = `${BASE_URL}/courses`;
    try {
      const newCourse = await fetchWithToken(url, "POST", courseDetails);
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  };

  const getCourseById = async () => {
    if (!course?.id) return;

    try {
      const courseData = await fetchWithToken(`${BASE_URL}/courses/getCourseById/${course.id}`);
      setCourse(courseData);
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching course.");
      }
    }
  };

  const fetchAllCourses = async () => {
    try {
      const courseData = await fetchWithToken(`${BASE_URL}/courses`);
      setCourses(courseData);
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching courses.");
      }
    }
  };

  const fetchUsersByCourse = async () => {
    try {
      const usersData = await fetchWithToken(
        `${BASE_URL}/users/courses/${course?.id}`
      );
      setUserList(usersData);
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching users.");
      }
    }
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

  const fetchCourse = async () => {
    if (!user) return;

    try {
      const courseData = await fetchWithToken(`${BASE_URL}/courses/${user.id}`);
      setCourse(courseData);
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
      const id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]!;
      const name = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]!.toLowerCase();
      const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]!.toLowerCase();

      setUser({ id, name, role });
    }
  }, [tokens]);

  useEffect(() => {
    if (isLoggedIn && user && user.role === "student") {
      fetchCourse();
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === "student") {
        fetchCourse();
      } else if (user.role === "teacher") {
        fetchAllCourses();
      }
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    setLoading(!userList || !course);
  }, [userList, course]);

  return (
    <ApiDataContext.Provider
      value={{
        user,
        users,
        userList,
        course,
        courses,
        loading,
        error,
        getCourseById,
        fetchUsers,
        setCourse,
        createCourse,
        fetchUsersByCourse,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
