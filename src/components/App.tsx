import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/authProvider";
import { router } from "../router";
import { ApiDataProvider } from "../context/ApiDataProvider";


export function App() {
  
  return (
    <AuthProvider>
      <ApiDataProvider>
        <RouterProvider router={router} />
      </ApiDataProvider>
    </AuthProvider>

);
}

