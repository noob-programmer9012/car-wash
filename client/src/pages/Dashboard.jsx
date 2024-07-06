import { Outlet, useNavigate } from "react-router-dom";

import TopUserNavBar from "../components/TopUserNavbar";
import BottomUserNavbar from "../components/BottomUserNavbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Dashboard() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    } else if (token && user !== "user") {
      navigate("/admin");
    }
  }, [token, user, navigate]);

  return (
    <>
      <TopUserNavBar />
      <div className="main">
        <Outlet />
      </div>
      <BottomUserNavbar className="bottom-nav" />
    </>
  );
}

export default Dashboard;
