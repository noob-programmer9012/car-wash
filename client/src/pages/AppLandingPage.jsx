import { Typography } from "@mui/material";
import UserCategories from "../components/UserCategories";
import UserServices from "../components/UserServices";
import "../css/landingpage.css";

function AppLandingPage() {
  return (
    <>
      <div className="categories">
        <UserCategories />
      </div>
      <div className="recommended-services">
        <Typography variant="h6">All Services</Typography>
        <UserServices />
      </div>
    </>
  );
}

export default AppLandingPage;
