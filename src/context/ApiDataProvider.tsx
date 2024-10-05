import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  BASE_URL,
  IUser,
  ICourses,
  IUserLoggedIn,
  addTokenToRequestInit,
  CustomError,
  IUserCourse,
  ICourseIds,
  IModules,
  IActivity,
} from "../utils";
import { useAuthContext } from "../hooks";
import { jwtDecode } from "jwt-decode";

interface IApiData {
  user: IUserLoggedIn | null;
  users: IUser[] | null;
  userList: IUser[] | null;
  course: ICourses | null;
  courses: ICourses[] | null;
  userCourses: IUserCourse[] | null;
  loading: boolean;
  error: string | null;
  courseIds: ICourseIds[] | null;

  activities: IActivity[] | null;

  getCourseById: () => Promise<void>;
  setCourse: React.Dispatch<React.SetStateAction<ICourses | null>>;
  createCourse: (courseDetails: {
    name: string;
    description: string;
    startDate: string;
  }) => Promise<void>;
  fetchUsersByCourse: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  createUser: (userDetails: { username: string; password: string; email: string; role: string; courseID: string }) => Promise<IUser>;
  createModule: (moduleDetails: { name: string; description: string; start: string; end: string; courseID: string })=> Promise<IModules>;
  createActivity: (activityDetails: { name: string; description: string; activityType: string; start: string; end: string; moduleID: string })=> Promise<void>;
  fetchAllCourses: () => Promise<void>;
  fetchActivities: (moduleId: string) => Promise<void>;
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
  const [userCourses, setUserCourses] = useState<IUserCourse[] | null>(null);
  const [activities, setActivities] = useState<IActivity[] | null>(null);
  const { tokens, isLoggedIn } = useAuthContext();
  const [courseIds] = useState<ICourseIds[] | null>(null);
  const [isModuleAdded, setIsModuleAdded] = useState(false);

  const fetchWithToken = async (
    url: string,
    method: string = "GET",
    body?: any
  ): Promise<any> => {
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

    // Check if there's content to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); // Parse JSON response
    }

    return null; // No content to return
  };

  const createCourse = async (courseDetails: {
    name: string;
    description: string;
    startDate: string;
  }): Promise<void> => {
    const url = `${BASE_URL}/courses`;
    try {
      const newCourse = await fetchWithToken(url, "POST", courseDetails);
      setCourses((prevCourses) =>
        Array.isArray(prevCourses) ? [...prevCourses, newCourse] : [newCourse]
      );
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  };

  const getCourseById = async () => {
    if (!course?.id) return;

    try {
      const courseData = await fetchWithToken(
        `${BASE_URL}/courses/getCourseById/${course.id}`
      );
      setCourse(courseData);
      localStorage.setItem("course", JSON.stringify(courseData));
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching course.");
      }
    }
  };

  const createUser = async (userDetails: {
    username: string;
    password: string;
    email: string;
    role: string;
    courseID: string;
  }): Promise<IUser> => {
    const url = `${BASE_URL}/authentication`;
    try {
      const newUser = await fetchWithToken(url, "POST", userDetails);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const createModule = async (moduleDetails: { name: string; description: string; start: string; end: string; courseID: string }): Promise<IModules> => {
    const url = `${BASE_URL}/modules`;
    try {
      const newModule = await fetchWithToken(url, "POST", moduleDetails);
      return newModule;
    } catch (error) {
      console.error("Error creating module:", error);
      throw error;
    }
  };

  const createActivity = async (activityDetails: { name: string; description: string; activityType: string; start: string; end: string; moduleID: string }): Promise<void> => {
    const url = `${BASE_URL}/activities`;
    try {
      const newActivity = await fetchWithToken(url, "POST", activityDetails);
      
      setActivities((prevActivity) =>
        Array.isArray(prevActivity) ? [...prevActivity, newActivity] : [newActivity]
      );
      console.log(activities)
    } catch (error) {
      console.error("Error creating activity:", error);
      throw error;
    }
  };

  const fetchUsersWithCourses = async () => {
    if (!course || !course.id) return;
    try {
      const response = await fetchWithToken(`${BASE_URL}/courses/usercourses`);
      console.log("Fetched user courses:", response);
      setUserCourses(response); // Assuming you have a state to hold this data
    } catch (err) {
      // Handle errors as needed
      console.error("Error fetching user courses:", err);
    }
  };

  const fetchActivities = async (moduleId: string): Promise<void> => {
    try {
      const activities = await fetchWithToken(`${BASE_URL}/activities/moduleid/${moduleId}`);
      console.log(moduleId)
      setActivities(activities); 
    } catch (err) {
      console.error("Error fetching activities for module:", err);
      setActivities([]);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const courseData = await fetchWithToken(`${BASE_URL}/courses`);
      console.log(courseData);
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
      localStorage.setItem("userList", JSON.stringify(usersData));
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
      const id =
        decode[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]!;
      const name =
        decode[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ]!.toLowerCase();
      const role =
        decode[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]!.toLowerCase();

      setUser({ id, name, role });
    }
  }, [tokens]);

  useEffect(() => {
    if (user) {
      console.log("User:", user); // Log user after it has been updated
    }
  }, [user]);

  useEffect(() => {
    getCourseById();
    fetchUsersByCourse();
  }, []);

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === "student") {
        fetchCourse();
      } else if (user.role === "teacher") {
        fetchAllCourses();
        fetchUsersWithCourses();
      }
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    const storedCourse = localStorage.getItem("course");
    const storedUserList = localStorage.getItem("userList");
    
    if (storedCourse) {
      setCourse(JSON.parse(storedCourse));
    }
    
    if (storedUserList) {
      setUserList(JSON.parse(storedUserList));
    }
  }, []);

  useEffect(() => {
    if (course?.id) {
      fetchUsersByCourse();
    }
  }, [course]);

  useEffect(() => {
    setLoading(!userList || !course);
  }, [userList, course]);

  useEffect(() => {
    if (isModuleAdded) {
        // Update localStorage only if a new module has been added
        if (course) {
            localStorage.setItem("course", JSON.stringify(course));
        }
        if (userList) {
            localStorage.setItem("userList", JSON.stringify(userList));
        }
        setIsModuleAdded(false); // Reset the flag after updating
    }
}, [isModuleAdded, course, userList]);

  return (
    <ApiDataContext.Provider
      value={{
        user,
        users,
        userList,
        course,
        courses,
        userCourses,
        loading,
        activities,
        error,
        courseIds,
        createUser,
        fetchAllCourses,
        createModule,
        fetchActivities,
        createActivity,
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
