import { useEffect, useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";

import InputField from "../components/InputField";
import "../css/resetPassword.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const data = useLoaderData();
  console.log(data);

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  const [show, setShow] = useState(false);
  const error = useActionData();

  function toggleVisible() {
    setVisible((prev) => !prev);
  }

  useEffect(() => {
    if (visible) setType("string");
    else setType("password");
  }, [visible]);

  useEffect(() => {
    if (error) setShow(true);
    if (!error) setShow(false);
  }, [error]);

  function handleClose() {
    setShow((prev) => !prev);
  }

  return (
    <div className="resetPasswordPage">
      <div className="card resetPassword">
        <Form className="form resetPasswordForm" method="post" noValidate>
          <h2>Reset Password</h2>
          {show && (
            <div className="error-block">
              <span className="material-symbols-outlined error-icon">
                error
              </span>
              <p className="error">{error}</p>
              <span
                className="material-symbols-outlined close"
                onClick={handleClose}
              >
                close
              </span>
            </div>
          )}
          <InputField
            required
            inputName="password"
            type="password"
            value={""}
          />
          <InputField type="hidden" inputName="token" value={data.data.token} />
          <div className="confirmPassword">
            <InputField
              required
              inputName="confirm password"
              type={type}
              value={""}
            />
            <div className="icon" onClick={toggleVisible}>
              {visible ? (
                <VisibilityIcon className={"showPassword"} />
              ) : (
                <VisibilityOffIcon className={"showPassword"} />
              )}
            </div>
          </div>
          <input type="submit" value="Reset Password" className="btn" />
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
