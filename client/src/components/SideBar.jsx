import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import GridViewIcon from "@mui/icons-material/GridView";
import WebhookIcon from "@mui/icons-material/Webhook";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

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
            <GridViewIcon className="material-symbols-outlined" />
            {/* <span className="material-symbols-outlined">category</span> */}
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
            {/* <span className="material-symbols-outlined">linked_services</span> */}
            <CategoryIcon className="material-symbols-outlined" />
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
            {/* <span className="material-symbols-outlined">car_crash</span> */}
            <WebhookIcon className="material-symbols-outlined" />
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
            {/* <span className="material-symbols-outlined">contact_phone</span> */}
            <ManageAccountsIcon className="material-symbols-outlined" />
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
            {/* <span className="material-symbols-outlined">receipt_long</span> */}
            <ReceiptLongIcon className="material-symbols-outlined" />
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