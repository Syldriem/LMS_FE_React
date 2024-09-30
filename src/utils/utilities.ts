import { jwtDecode } from "jwt-decode";
import { ITokenObjectExtensions } from "../utils";

export function addTokenToRequestInit(
  accessToken?: string,
  options?: RequestInit
): RequestInit {
  const requestObject: RequestInit = { ...options };

  if (accessToken) {
    requestObject.headers = {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return requestObject;
}

export function hasTokenExpired(token: string): boolean {
  if (!token) return true;

  const decoded = jwtDecode(token);
  const expire = decoded.exp! * 1000; // * 1000 to get time in milliseconds.
  const currentTimestamp = Date.now();

  return expire < currentTimestamp;
}

export function payloadJsonFromToken(token: string): string {
  const decodedPayload = jwtDecode<ITokenObjectExtensions>(token);
  const tokenPayloadString = JSON.stringify(decodedPayload);
  return tokenPayloadString;
}

export function roleJsonFromToken(token: string): string {
  const decoded = jwtDecode<ITokenObjectExtensions>(token);
  const role = decoded[ "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" ];
  console.log("This is the user role extracted from the decoded access token payload: ", role);

  return role || "user role not found";
}
