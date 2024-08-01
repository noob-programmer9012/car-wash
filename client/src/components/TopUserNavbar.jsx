import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import { authActions, persistor } from "../store/auth";
import { useLoaderData, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import CottageIcon from "@mui/icons-material/Cottage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import titleCase from "../utils/titleCase";
import { useEffect, useState } from "react";

export default function TopUserNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useLoaderData();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data.cart.items.length > 0) setVisible(false);
  }, [visible, data]);

  async function handleLogOut() {
    dispatch(authActions.setUser({ user: undefined, token: undefined }));
    await persistor.flush();
    return navigate("/login");
  }

  return (
    <div className="top-nav">
      <div className="address">
        <CottageIcon />
        <Typography variant="p">{titleCase(data.address.homeNo)}</Typography>
      </div>

      <div className="actions">
        <div className="move" onClick={() => navigate("/cart")}>
          <Badge
            badgeContent={data.cart.items.length}
            color="primary"
            invisible={visible}
          >
            <ShoppingCartIcon />
          </Badge>
        </div>

        <div className="user" onClick={handleLogOut}>
          <Typography variant="p" className="name">
            {titleCase(data.fullname)}
          </Typography>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}
