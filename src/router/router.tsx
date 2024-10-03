import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "../components";
import { LoginPage, TeacherPage, MyCoursePage, UserListPage, Unauthorized, CourseDetails } from "../pages";
import { AuthGuard } from "../components/AuthGuard";

// Define routes with AuthGuard wrapping protected pages
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/coursedetails" element={<CourseDetails />} />

      {/* Protected routes wrapped in AuthGuard */}
        <Route path="/teacherpage" element={<AuthGuard children={<TeacherPage />} />} />
        <Route path="/mycoursepage" element={<AuthGuard children={<MyCoursePage />} />} />
        <Route path="/userlist" element={<AuthGuard children={<UserListPage />} />} />
        <Route path="/unauthorized" element={<AuthGuard children={<Unauthorized />} />} />
    </>
  )
);
