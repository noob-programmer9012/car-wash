import { Outlet, useLoaderData } from "react-router-dom";

import TopUserNavBar from "../components/TopUserNavbar";
import BottomUserNavbar from "../components/BottomUserNavbar";

function Dashboard() {
  const data = useLoaderData();

  return (
    <>
      <TopUserNavBar user={data} />
      <div className="main">
        <Outlet />
      </div>
      <BottomUserNavbar className="bottom-nav" />
    </>
  );
}

export default Dashboard;
