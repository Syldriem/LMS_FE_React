export interface IAuthContext {
  tokens: ITokens | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ICompany {
  id: string;
  name: string;
  address: string;
  employees: any[];
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