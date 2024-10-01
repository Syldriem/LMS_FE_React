import { ReactElement, useContext, useEffect } from "react";
import { ApiDataContext } from "../context/ApiDataProvider";
import { useAuthContext } from "../hooks";
import "../css/UserListPage.css";
import { useNavigate } from "react-router-dom";
import { RenderUserListPage } from "./render/RenderUserList";
export function UserListPage(): ReactElement {
  const {users, courses} = useContext(ApiDataContext);
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Test");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return <RenderUserListPage users={users} courses={courses} user={null} />;
}