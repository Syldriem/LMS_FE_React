import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/authProvider";
import { router } from "../router";
import { ApiDataProvider } from "../context/ApidataProvider";
// import { LoginStatusChip } from "./LoginStatusChip";

export function App() {
  
  return (
    <AuthProvider>
      <ApiDataProvider>
      <RouterProvider router={router} />
      {/* <LoginStatusChip /> */}
      </ApiDataProvider>
    </AuthProvider>
  );
}
