import { useEffect, useState } from "react";

function Admin() {
  return <h1>Admin</h1>;
}

function User() {
  return <h1>User</h1>;
}

function Dashboard() {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin) {
      setComponent(<Admin />);
    } else {
      setComponent(<User />);
    }
  }, []);

  return <>{component}</>;
}

export default Dashboard;
