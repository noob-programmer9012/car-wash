import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { authActions, persistor } from "../store/auth";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import CottageIcon from "@mui/icons-material/Cottage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import titleCase from "../utils/titleCase";

export default function TopUserNavBar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogOut() {
    dispatch(authActions.setUser({ user: undefined, token: undefined }));
    await persistor.flush();
    return navigate("/login");
  }

  return (
    <div className="top-nav">
      <div className="address">
        <CottageIcon />
        <Typography variant="p">{titleCase(user.address.homeNo)}</Typography>
      </div>

      <div className="actions">
        <div className="move" onClick={() => navigate("/cart")}>
          {user.cart.items.length > 0 ? (
            <Badge badgeContent={user.cart.items.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <ShoppingCartIcon />
          )}
        </div>

        <div className="user" onClick={handleLogOut}>
          <Typography variant="p" className="name">
            {titleCase(user.fullname)}
          </Typography>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}

TopUserNavBar.propTypes = { user: PropTypes.object.isRequired };
