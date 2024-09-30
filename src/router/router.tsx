import { createBrowserRouter, createRoutesFromElements, Route, Router, Routes } from "react-router-dom";
import { Companies, RequireAuth } from "../components";
import { LandingPage, LoginPage, /*LandingPage*/ } from "../pages";
import { MyCoursePage } from "../pages/MyCoursePage";
import { ActivityListPage } from "../pages/ActivityListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/mycoursepage",
    element: <MyCoursePage />
  },
  {
    path: "/activitylist/:moduleId",
    element: <ActivityListPage />
  }
]);
