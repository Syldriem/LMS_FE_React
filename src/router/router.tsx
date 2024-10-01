import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { RequireAuth } from "../components";
import {
  LoginPage,
  TeacherPage,
  MyCoursePage,
  Unauthorized,
  CourseDetails,
} from "../pages";
import { ActivityListPage } from "../pages/ActivityListPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        element={<RequireAuth children={<CourseDetails />} />}
        path="/coursedetails"
      />
      <Route
        element={<RequireAuth children={<TeacherPage />} />}
        path="/teacherpage"
      ></Route>
      <Route
        element={<RequireAuth children={<MyCoursePage />} />}
        path="/mycoursepage"
      ></Route>
      <Route
        element={<RequireAuth children={<Unauthorized />} />}
        path="/unauthorized"
      />
        <Route
        element={<RequireAuth children={<ActivityListPage />} />}
        path="/activitylist/:moduleId"
      />
    </>
  )
);
