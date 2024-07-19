import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import GridViewIcon from "@mui/icons-material/GridView";
import WebhookIcon from "@mui/icons-material/Webhook";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";

import { authActions, persistor } from "../store/auth";

export default function SideBar() {
  const history = useLocation();
  const location = history.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogOut() {
    dispatch(authActions.setUser({ user: undefined, token: undefined }));
    await persistor.flush();
    return navigate("/login");
  }

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
        <div className="user-settings" onClick={handleLogOut}>
          <LogoutIcon />
        </div>
      </div>
    </>
  );
}
