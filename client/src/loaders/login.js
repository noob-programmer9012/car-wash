export const login = () => {
  if (history.state.message === "JWT EXPIRED") return "JWT EXPIRED";
  else if (history.state.message === "Successfully created your account!")
    return "Successfully created your account!";
  else return null;
};
