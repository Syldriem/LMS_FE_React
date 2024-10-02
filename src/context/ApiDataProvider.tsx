import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  BASE_URL,
  IUser,
  ICourses,
  IUserLoggedIn,
  addTokenToRequestInit,
  ITokens,
  CustomError,
  IUserCourse,
} from "../utils";
import { useAuthContext } from "../hooks";
import { jwtDecode } from "jwt-decode";
import { useFetchWithToken } from "../hooks/useFetchWithToken";

interface IApiData {
  user: IUserLoggedIn | null;
  users: IUser[] | null;
  course: ICourses | null;
  courses: ICourses[] | null;
  userCourses: IUserCourse[] | null;
  loading: boolean;
  error: string | null;

  getCourseById: (courseId: string) => Promise<ICourses | null>;
  setCourse: React.Dispatch<React.SetStateAction<ICourses | null>>;
  createCourse: (courseDetails: { name: string; description: string; startDate: string; }) => Promise<ICourses>;
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
  const [course, setCourse] = useState<ICourses | null>(null);
  const [courses, setCourses] = useState<ICourses[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUserLoggedIn | null>(null);
  const [userCourses, setUserCourses] = useState<IUserCourse[] | null>(null);
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

  const getCourseById = async (courseID: string) => {
    if (!user) return null;
  
    try {
      const courseData = await fetchWithToken(
        `${BASE_URL}/courses/getCourseById/${courseID}` // Ensure you are formatting the URL correctly
      );
      return courseData; // Make sure this includes the Id and Name
    } catch (err) {
      // Handle errors as needed
      return null; // Return null if there was an error
    }
  }
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

  const fetchUsersWithCourses = async () => {
    try {
      const response = await fetchWithToken(`${BASE_URL}/courses/usercourses`);

      console.log("Fetched user courses:", response);
      setUserCourses(response); // Assuming you have a state to hold this data
    } catch (err) {
      // Handle errors as needed
      console.error("Error fetching user courses:", err);
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
      const id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]!;
      const name = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]!.toLowerCase();
      const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]!.toLowerCase();

      setUser({ id, name, role });
    }
  }, [tokens]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && user && user.role === "student") {
      fetchCourses();
    }
    if (isLoggedIn && user && user.role === "teacher") {
      fetchAllCourses();
      fetchUsersWithCourses();
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    setLoading(!users || !course);
  }, [users, course]);

  return (
    <ApiDataContext.Provider
      value={{
        user,
        users,
        course,
        courses,
        userCourses,
        loading,
        error,
        getCourseById,
        setCourse,
        createCourse,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
