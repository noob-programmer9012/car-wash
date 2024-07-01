import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";
import "../css/admin.css";

export default function AdminDashboard() {
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
