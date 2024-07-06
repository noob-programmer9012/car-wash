import { useSelector } from "react-redux";

import UserCategories from "../components/UserCategories";

function AppLandingPage() {
  const token = useSelector((state) => state.token);

  return (
    <>
      <UserCategories token={token} />
    </>
  );
}

export default AppLandingPage;
