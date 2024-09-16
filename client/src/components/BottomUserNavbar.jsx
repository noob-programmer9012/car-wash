import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function BottomUserNavbar() {
  return (
    <div className="bottom-nav">
      <div className="navigation">
        <div className="nav">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            <div className="navlink">
              <HomeIcon className="bottom-icons" />
              <Typography variant="p">Home</Typography>
            </div>
          </NavLink>
        </div>
        <div className="nav">
          <NavLink to="/orders">
            <div className="navlink">
              <HistoryIcon className="bottom-icons" />
              <Typography variant="p">Orders</Typography>
            </div>
          </NavLink>
        </div>
        <div className="nav">
          <NavLink to="/profile">
            <div className="navlink">
              <AccountCircleIcon className="bottom-icons" />
              <Typography variant="p">Profile</Typography>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
