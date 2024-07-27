import { Outlet } from "react-router-dom";

function AdminCategories() {
  return (
    <>
      <div className="category">
        <Outlet />
      </div>
    </>
  );
}

export default AdminCategories;
