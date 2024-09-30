import { JwtPayload } from "jwt-decode";


export interface IAuthContext {
  tokens: ITokens | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  userRole: string;
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
  course: IModules;
  Id: string;
  name: string;
  start: Date;
  modules: IModules[];
  
}

export interface IModules{
  id: string,
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

export interface IUserLoggedIn {
  id?: string;
  name?: string;
  role?: string;
}