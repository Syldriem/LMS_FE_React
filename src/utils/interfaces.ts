import { JwtPayload } from "jwt-decode";
import { CustomError } from "./classes";

export interface IAuthContext {
  tokens: ITokens | null;
  isLoggedIn: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<ITokens | CustomError | undefined>;
  logout: () => void;
  user: IUserLoggedIn | null;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenObjectExtensions extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export interface ICourses {
  id: string;
  name: string;
  description: string;
  start: Date;
  modules: IModules[];
}

export interface IModules {
  id: string;
  name: string;
  description: string;
  //activities: any[];
  start: string;
  end: string;
}

export interface IUser {
  id: string;
  userName: string;
  role: string;
  email: string;
  courseID: string;
}

export interface ICourseIds {
  id: string;
  name: string;
}

export interface IUserCourse {
  userName: string;
  courseName: string;
}

export interface IUserLoggedIn {
  id: string;
  name: string;
  role: string;
}
export interface IActivity {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  activityType: string;
}
