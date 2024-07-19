import LogoutIcon from "@mui/icons-material/Logout";
import CottageIcon from "@mui/icons-material/Cottage";
import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { authActions, persistor } from "../store/auth";
import { useNavigate } from "react-router-dom";

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
        <Typography variant="p">{user.address.homeNo}</Typography>
      </div>
      <div className="user" onClick={handleLogOut}>
        <Typography variant="p" className="name">
          {user.fullname}
        </Typography>
        <LogoutIcon />
      </div>
    </div>
  );
}

TopUserNavBar.propTypes = { user: PropTypes.object.isRequired };
