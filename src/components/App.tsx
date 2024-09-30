import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/authProvider";
import { router } from "../router";

export function App() {
  console.log("The App function has been entered");
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
