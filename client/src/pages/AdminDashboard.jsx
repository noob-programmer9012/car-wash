import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../components/SideBar";
import "../css/admin.css";
import { useEffect } from "react";
import { authActions } from "../store/auth";

export default function AdminDashboard() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    return dispatch(authActions.setUser({ token: undefined, user: undefined }));
  }

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    } else if (token && user !== "admin") {
      navigate("/");
    }
  }, [token, user, navigate]);

  return (
    <>
      <div className="admin-wrapper">
        <SideBar />
        <div className="admin-main">
          <Outlet token={token} />
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
}
