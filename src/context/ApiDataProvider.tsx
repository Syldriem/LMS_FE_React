import { createContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL, IUser, ICourses, IActivity } from '../utils'

export interface IApiData {
    users: IUser[];
    courses: ICourses[];
    filterUsersByCourseAndRole: (courseId: string, role: string) => IUser[];
    loading: boolean;
    error: string | null;
    activity : IActivity[];
    onActivityListOpen : (moduleId: string) => void;
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
    const [activity, setActivity] = useState<IActivity[]>([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const userResponse = await fetch(`${BASE_URL}/users`);
        const courseResponse = await fetch(`${BASE_URL}/courses`);

        const usersData: IUser[] = await userResponse.json();
        const coursesData: ICourses[] = await courseResponse.json();

        setUsers(usersData);
        setCourses(coursesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onActivityListOpen = (moduleId : string) => {
    setTimeout(() => {
      fetchActivities(moduleId).then((act) => {
        setActivity([...act]);
      })
    }, 1000);
  }

  const filterUsersByCourseAndRole = (courseId: string, role: string): IUser[] => {
    return users.filter((user) => user.courseID === courseId && user.role === role);
  };


  return (
    <ApiDataContext.Provider value={{filterUsersByCourseAndRole, users, courses, loading, error, activity, onActivityListOpen}}>
      {children}
    </ApiDataContext.Provider>
  );

};

async function fetchActivities(moduleId: string) {
  try {
    const response = await fetch("http://localhost:5058/api/activities/" + moduleId);
    const list = await response.json();
    

    return list;
  } catch (error) {
    console.log(error);
    return;
  }
}