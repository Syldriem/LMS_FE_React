import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { RequireAuth } from "../components";
import { LoginPage, TeacherPage, MyCoursePage, UserListPage, Unauthorized, CourseDetails } from "../pages";

import { ActivityListPage } from "../pages/ActivityListPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/coursedetails" element={<CourseDetails />} />
      <Route path="/teacherpage" element={<TeacherPage />} />

      <Route path="/MyCoursePage" element={<MyCoursePage />} />

      <Route path="/userlist" element={<UserListPage />} />

      <Route
        element={<RequireAuth children={<Unauthorized />} />}
        path="/unauthorized"
      />
    </>
  )
);
