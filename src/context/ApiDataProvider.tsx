import { createContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL, IUser, ICourses } from '../utils'

interface IApiData {
    users: IUser[];
    courses: ICourses[];
    filterUsersByCourseAndRole: (courseId: string, role: string) => IUser[];
    loading: boolean;
    error: string | null;
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

  const filterUsersByCourseAndRole = (courseId: string, role: string): IUser[] => {
    return users.filter((user) => user.courseID === courseId && user.role === role);
  };

  return (
    <ApiDataContext.Provider value={{filterUsersByCourseAndRole, users, courses, loading, error }}>
      {children}
    </ApiDataContext.Provider>
  );

};