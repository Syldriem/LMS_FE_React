import { useContext } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";

export function useApiContext() {
  return useContext(ApiDataContext);
}
