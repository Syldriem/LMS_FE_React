import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/authProvider";
import { router } from "../router";
import { ApiDataProvider } from "../context/ApiDataProvider";
import { AuthGuard } from "./AuthGuard";


export function App() {
  
  return (
<AuthProvider>
  <ApiDataProvider>
    <RouterProvider router={router} />
    {/* Other components that need access to both contexts */}
  </ApiDataProvider>
</AuthProvider>

);
}

