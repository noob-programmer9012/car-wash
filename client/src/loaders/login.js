export const login = () => {
  if (history.state.message === "JWT EXPIRED") return "JWT EXPIRED";
  else return null;
};
