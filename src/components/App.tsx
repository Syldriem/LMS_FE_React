import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/authProvider";
import { router } from "../router";
// import { LoginStatusChip } from "./LoginStatusChip";

export function App() {
  console.log("this is new compiknent");
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <LoginStatusChip /> */}
    </AuthProvider>
  );
}
