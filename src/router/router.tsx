import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Companies, RequireAuth } from "../components";
import { LoginPage, LandingPage } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route
        element={
          <RequireAuth>
            <StartPage />
          </RequireAuth>
        }
        path="/"
      ></Route> */}
      <Route element={<RequireAuth children={<LandingPage />} />} path="/">
       <Route element={<Companies />} index />
      </Route>
      <Route element={<LoginPage />} path="/login" />
    </>
  )
);
