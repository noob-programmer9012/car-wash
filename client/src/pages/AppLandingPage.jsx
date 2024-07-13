import { useSelector } from "react-redux";

import UserCategories from "../components/UserCategories";
import "../css/landingpage.css";

function AppLandingPage() {
  const token = useSelector((state) => state.token);

  return (
    <>
      <div className="user-data"></div>
      <div className="categories">
        <UserCategories token={token} />
      </div>
    </>
  );
}

export default AppLandingPage;
