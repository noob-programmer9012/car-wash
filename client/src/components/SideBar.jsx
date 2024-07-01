import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar() {
  const history = useLocation();
  const location = history.pathname;

  useEffect(() => {
    const active = document.querySelector(".link.active");
    document.querySelector(".material-symbols-outlined.active")
      ? document
          .querySelector(".material-symbols-outlined.active")
          .classList.remove("active")
      : "";
    active.parentNode.children[0].classList.add("active");
  }, [location]);

  return (
    <>
      <div className="sidebar">
        <div className="navlinks">
          <div className="sub-link">
            <span className="material-symbols-outlined">category</span>
            <NavLink
              to="."
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : ""
              }
              end
            >
              Dashboard
            </NavLink>
          </div>
          <div className="sub-link">
            <span className="material-symbols-outlined">linked_services</span>
            <NavLink
              to="/admin/categories"
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : ""
              }
            >
              Categories
            </NavLink>
          </div>
          <div className="sub-link">
            <span className="material-symbols-outlined">car_crash</span>
            <NavLink
              to="/admin/services"
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : ""
              }
            >
              Services
            </NavLink>
          </div>
          <div className="sub-link">
            <span className="material-symbols-outlined">contact_phone</span>
            <NavLink
              to="/admin/customers"
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : ""
              }
            >
              Customers
            </NavLink>
          </div>
          <div className="sub-link">
            <span className="material-symbols-outlined">receipt_long</span>
            <NavLink
              to="/admin/orders"
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : ""
              }
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
