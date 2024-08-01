import { Outlet } from "react-router-dom";

import TopUserNavBar from "../components/TopUserNavbar";
import BottomUserNavbar from "../components/BottomUserNavbar";

function Dashboard() {
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
