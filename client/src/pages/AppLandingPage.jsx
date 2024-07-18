import UserCategories from "../components/UserCategories";
import "../css/landingpage.css";

function AppLandingPage() {
  return (
    <>
      <div className="user-data"></div>
      <div className="categories">
        <UserCategories />
      </div>
    </>
  );
}

export default AppLandingPage;
