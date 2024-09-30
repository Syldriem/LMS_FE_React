import { JwtPayload } from "jwt-decode";


export interface IAuthContext {
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

// export interface ICompany {
//   id: string;
//   name: string;
//   address: string;
//   employees: any[];
// }

// export interface ICourses {
//   id: string;
//   name: string;
// }

// export interface IModules{

//   id: string;
//   name: string;
//   activities: any[];

// }

// export interface IStudent {
//   id: string;
//   name: string;
// }