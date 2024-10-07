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
  myCourseuserList: IUser[] | null;
  course: ICourses | null;
  myCourse: ICourses | null;
  courses: ICourses[] | null;
  userCourses: IUserCourse[] | null;
  loading: boolean;
  error: string | null;
  courseIds: ICourseIds[] | null;

  getCourseByIdFromRouter: (courseId: string) => Promise<void>;
  activities: IActivity[] | null;
  setmyCourse: (course: ICourses | null) => void;
  setUserList: (users: IUser[]) => void;
  getCourseById: () => Promise<void>;
  setCourse: React.Dispatch<React.SetStateAction<ICourses | null>>;
  createCourse: (courseDetails: {
    name: string;
    description: string;
    startDate: string;
  }) => Promise<void>;
  fetchUsersByCourse: () => Promise<void>;
  fetchUsersMyCourse: (id: string) => Promise<void>;
  fetchUsersByCourseId: (courseId: string) => Promise<void>;
  fetchUsers: () => Promise<IUser[]>;
  createUser: (userDetails: {
    username: string;
    password: string;
    email: string;
    role: string;
    courseID: string;
  }) => Promise<IUser>;
  createModule: (moduleDetails: {
    name: string;
    description: string;
    start: string;
    end: string;
    courseID: string;
  }) => Promise<IModules>;
  createActivity: (activityDetails: { name: string; description: string; activityType: string; start: string; end: string; moduleID: string })=> Promise<void>;
  fetchAllCourses: () => Promise<void>;
  fetchCourse: (id: string) => Promise<void>;
  fetchUsersWithCourses: () => Promise<IUserCourse[]>;
  
  fetchActivities: (moduleId: string) => Promise<void>;
  handleDeleteUser: (userId: string) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  deleteModule: (moduleId: string) => Promise<void>;
  deleteActivity: (actId: string) => Promise<void>;
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
  const [myCourseuserList, myCoursesetUserList] = useState<IUser[] | null>(null);
  const [course, setCourse] = useState<ICourses | null>(null);
  const [myCourse, setmyCourse] = useState<ICourses | null>(null);
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
      alert("Course added");
    } catch (error) {
      alert("Error creating course:" + error);
      throw error;
    }
  };

  const getCourseById = async () => {
    if (!course?.id) return;

    try {
      const courseData = await fetchWithToken(
        `${BASE_URL}/courses/getCourseById/${course?.id}`
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

  const getCourseByIdFromRouter = async (courseId: string) => {
    console.log(courseId);
    try {
      const courseData = await fetchWithToken(
        `${BASE_URL}/courses/getCourseById/${courseId}`
      );

      console.log(courseData);
      setCourse(courseData);
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
      alert("User added")
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const createModule = async (moduleDetails: {
    name: string;
    description: string;
    start: string;
    end: string;
    courseID: string;
  }): Promise<IModules> => {
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
      alert("activities added")
    } catch (error) {
      console.error("Error creating activity:", error);
      throw error;
    }
  };

  const fetchUsersWithCourses = async (): Promise<IUserCourse[]> => {
    if (!course || !course.id) return []; // Return an empty array instead of void
  
    try {
      const response = await fetchWithToken(`${BASE_URL}/courses/usercourses`);
      console.log("Fetched user courses:", response);
  
      // Ensure the response is of the expected type before setting the state
      if (Array.isArray(response)) {
        setUserCourses(response); // Assuming you have a state to hold this data
        return response; // Return the valid response
      } else {
        console.error("Unexpected response format:", response);
        return []; // Return an empty array in case of unexpected format
      }
    } catch (err) {
      // Handle errors as needed
      console.error("Error fetching user courses:", err);
      return []; // Return an empty array in case of error
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


  const fetchUsersMyCourse = async (id: string) => {
    try {
      const usersData = await fetchWithToken(
        `${BASE_URL}/users/courses/${id}`
      );
      
      setUserList(usersData); // Ensure you have a state setter for userList
      localStorage.setItem("userList", JSON.stringify(usersData));
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching users.");
      }
    }
  };

  const fetchUsersByCourseId = async (courseId: string) => {
    try {
      const usersData = await fetchWithToken(
        `${BASE_URL}/users/courses/${courseId}`
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

  const fetchUsers = async (): Promise<IUser[]> => {
    try {
      const usersData = await fetchWithToken(`${BASE_URL}/users`);
      setUsers(usersData); // Update the state with fetched users
      return usersData; // Return the fetched data
    } catch (err) {
      // Handle error and set the error state
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching users.");
      }
      return []; // Ensure that the return type is consistent
    }
  };


  const fetchCourse = async (id: string) => {

    try {
      const courseData = await fetchWithToken(`${BASE_URL}/courses/${id}`);
      setmyCourse(courseData);
      if(!courseData){
        setmyCourse(null);
      }
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching courses.");
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Corrected API URL to point to the user endpoint
      const url = `${BASE_URL}/users/${userId}`;
  
      // Use fetchWithToken with the DELETE method, no body is necessary for deletion
      await fetchWithToken(url, "DELETE");
  
      // Remove the user from the list on success
      const updatedUsers = users?.filter((user) => user.id !== userId);

      setUsers(updatedUsers!);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error, show a message to the user if necessary
    }
  };
  const deleteCourse = async (courseId: string) => {
    try {
      // Corrected API URL to point to the user endpoint
      const url = `${BASE_URL}/courses/${courseId}`;
  
      // Use fetchWithToken with the DELETE method, no body is necessary for deletion
      await fetchWithToken(url, "DELETE");
  
      // Remove the user from the list on success
      const updatedCourses = courses?.filter((course) => course.id !== courseId);

      setCourses(updatedCourses!);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error, show a message to the user if necessary
    }
  };

  const deleteModule = async (moduleId: string) => {
    try {
      const url = `${BASE_URL}/modules/${moduleId}`;
      await fetchWithToken(url, "DELETE");
  
      const updatedCourses = courses?.map(course => {
        const filteredModules = course.modules.filter(module => module.id !== moduleId);
        return { ...course, modules: filteredModules };
      });
  
      setCourses(updatedCourses!); // Update the state with the new courses
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const deleteActivity = async (actId: string) => {
    try {
      const url = `${BASE_URL}/activities/${actId}`;
      await fetchWithToken(url, "DELETE");
  
      // Update the state to remove the deleted activity
      const updatedCourses = courses?.map(course => {
        // Update the modules in each course
        const updatedModules = course.modules.map(module => {
          // Filter out the activity with the given actId
          const filteredActivities = module.activities.filter(activity => activity.id !== actId);
          
          return {
            ...module,
            activities: filteredActivities // Update the activities in the module
          };
        });
  
        return {
          ...course,
          modules: updatedModules // Update the modules in the course
        };
      });
  
      setCourses(updatedCourses!); // Update the state with the new courses
  
      // If activities are also being managed in a separate state, update it here
      setActivities(prevActivities => 
        prevActivities?.filter(activity => activity.id !== actId) || null
      );
  
    } catch (error) {
      console.error("Error deleting activity:", error);
      // Handle error, show a message to the user if necessary
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
      console.log(id)
      setUser({ id, name, role });
    }
  }, [tokens]);

  useEffect(() => {
    if (user) {
      console.log("User:", user); // Log user after it has been updated
    }
  }, [user]);

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
        myCourse,
        courses,
        myCourseuserList,
        userCourses,
        loading,
        activities,
        error,
        courseIds,
        createUser,
        setmyCourse,
        deleteActivity,
        setUserList,
        handleDeleteUser,
        fetchCourse,
        fetchAllCourses,
        createModule,
        fetchUsersMyCourse,
        fetchActivities,
        createActivity,
        deleteModule,
        getCourseById,
        fetchUsersWithCourses,
        fetchUsers,
        setCourse,
        createCourse,
        fetchUsersByCourse,
        fetchUsersByCourseId,
        getCourseByIdFromRouter,
        deleteCourse
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
