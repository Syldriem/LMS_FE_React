import { useEffect } from "react";
import { RenderCourseDetails } from "./render/RenderCourseDetails";
import { useApiContext } from "../hooks/useApiDataContext";


export function CourseDetails() {
  
  return <RenderCourseDetails />;
}
