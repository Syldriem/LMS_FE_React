import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/authProvider";
import { router } from "../router";
import { ApiDataProvider } from "../context/ApiDataProvider";
// import { LoginStatusChip } from "./LoginStatusChip";

export function App() {
  
  return (
    <>
      <AuthProvider>
      <ApiDataProvider>
        <RouterProvider router={router} />
        {/* <LoginStatusChip /> */}
      </ApiDataProvider>
      </AuthProvider>
    </>
  );
}
