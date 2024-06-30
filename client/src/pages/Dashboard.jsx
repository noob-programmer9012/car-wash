// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import TopUserNavBar from "../components/TopUserNavbar";
import BottomUserNavbar from "../components/BottomUserNavbar";

// function Admin() {
//   return <h1>Admin</h1>;
// }

// function User() {
//   return <h1>User</h1>;
// }

function Dashboard() {
  // const [component, setComponent] = useState(null);

  // useEffect(() => {
  //   const isAdmin = localStorage.getItem("isAdmin");
  //   if (isAdmin) {
  //     setComponent(<Admin />);
  //   } else {
  //     setComponent(<User />);
  //   }
  // }, []);

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
