import { useContext } from "react";
import { ApiDataContext, IApiData } from "../context/ApiDataProvider";

export function useProjectLogic() : IApiData {
    return useContext(ApiDataContext);
}