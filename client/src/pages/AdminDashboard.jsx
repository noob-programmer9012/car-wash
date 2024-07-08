import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SideBar from "../components/SideBar";
import "../css/admin.css";
import { useEffect } from "react";

export default function AdminDashboard() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
          <Outlet />
        </div>
      </div>
    </>
  );
}
