import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";

import "../css/admin.css";

export default function AdminDashboard() {
  useEffect(() => {
    const active = document.getElementsByTagName("a");

    for (let i = 0; i < active.length; i++) {
      active[i].addEventListener("click", () => {
        console.log(
          document.querySelector(".material-symbols-outlined.active")
        );
        document.querySelector(".material-symbols-outlined.active")
          ? document
              .querySelector(".material-symbols-outlined.active")
              .classList.remove("active")
          : "";
        active[i].parentNode.childNodes[0].classList.add("active");
      });
    }
  }, []);

  return (
    <>
      <div className="admin-wrapper">
        <div className="sidebar">
          <div className="navlinks">
            <div className="sub-link">
              <span className="material-symbols-outlined">category</span>
              <NavLink
                to="."
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : ""
                }
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
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
