import { Form, Link, useActionData, useRevalidator } from "react-router-dom";
import InputField from "../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "../css/signup.css";
import { useEffect, useState } from "react";

const Signup = () => {
  const actionData = useActionData();
  const validator = useRevalidator();

  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");

  function toggleVisible() {
    setVisible((prev) => !prev);
  }

  useEffect(() => {
    if (visible) setType("string");
    else setType("password");
  }, [visible]);

  function handleClose() {
    setShow((prev) => !prev);
  }

  useEffect(() => {
    if (actionData && actionData.startsWith("ValidationError")) {
      setError("Validation Error");
      setShow((prev) => !prev);
    } else if (actionData && actionData.indexOf("duplicate") !== -1) {
      setError("Please choose another email address");
      setShow(true);
    } else {
      setError(actionData);
      setShow(true);
    }
    if (!actionData) setShow(false);
  }, [actionData]);

  useEffect(() => {
    if (show) {
      const erBlock = document.querySelector(".error-block");
      const error = document.querySelector(".error");
      erBlock && erBlock.classList.add("show");
      error && error.classList.add("show");
    } else {
      const erBlock = document.querySelector(".error-block");
      const error = document.querySelector(".error");
      erBlock && erBlock.classList.remove("show");
      error && error.classList.remove("show");
      validator.revalidate();
    }
  }, [show, validator]);

  const [part, setPart] = useState(1);

  useEffect(() => {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const divs = document.querySelectorAll(".change-parts > div");

    if (part === 1) {
      prev.disabled = true;
      next.disabled = false;
      divs[1].style.height = "10px";
      divs[1].style.width = "10px";
      divs[0].style.height = "15px";
      divs[0].style.width = "15px";
      divs[1].style.backgroundColor = "black";
      divs[0].style.backgroundColor = "#fff";
    } else {
      prev.disabled = false;
      next.disabled = true;
      divs[0].style.height = "10px";
      divs[0].style.width = "10px";
      divs[1].style.height = "15px";
      divs[1].style.width = "15px";
      divs[0].style.backgroundColor = "black";
      divs[1].style.backgroundColor = "#fff";
    }
  }, [part]);

  const next = () => {
    const partOne = document.querySelector(".part-one");
    const partTwo = document.querySelector(".part-two");

    const password = document.querySelector(".input.password").value;
    const confirmPassword = document.querySelector(
      ".input.confirm.password"
    ).value;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setShow(true);
      return;
    }

    setPart(2);
    partOne.classList.remove("show");
    partTwo.classList.add("show");
  };

  const prev = () => {
    const partOne = document.querySelector(".part-one");
    const partTwo = document.querySelector(".part-two");

    setPart(1);
    partTwo.classList.remove("show");
    partOne.classList.add("show");
  };

  return (
    <div className="signup-component">
      <div className="signup-items">
        {show && (
          <div className="error-block">
            <span className="material-symbols-outlined error-icon">error</span>
            <p className="error">{error}</p>
            <span
              className="material-symbols-outlined close"
              onClick={handleClose}
            >
              close
            </span>
          </div>
        )}
        <Form noValidate className="form signup-form" method="POST">
          <div className="part-one show">
            <h1>Sign Up</h1>
            <InputField required inputName="email" type="string" value={""} />
            <InputField
              required
              inputName="password"
              type="password"
              value={""}
            />
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
            <InputField
              required
              inputName="fullname"
              type="string"
              value={""}
              validator="character"
            />
          </div>
          <div className="part-two">
            <h1>Profile</h1>
            <div className="address">
              <InputField
                required
                inputName="home No"
                type="string"
                value={""}
              />
              <div className="extra">
                <InputField
                  required
                  inputName="landmark"
                  type="string"
                  value={""}
                />
                <InputField
                  required
                  inputName="area"
                  type="string"
                  value={""}
                />
              </div>
              <div className="city">
                <InputField
                  required
                  inputName="pincode"
                  type="string"
                  value={""}
                  validator="number"
                />
                <InputField
                  required
                  inputName="city"
                  type="string"
                  value={""}
                  validator="character"
                />
              </div>
              <InputField
                inputName="mobile no"
                required
                type="string"
                value={""}
                validator="number"
              />
            </div>
            <input type="submit" className="btn" value={"Submit"} />
          </div>
        </Form>
        <p>
          Already have an account?&nbsp;&nbsp;<Link to="/login">Login</Link>
        </p>
        <div className="change-parts">
          <button
            type="button"
            id="prev"
            value={"Previous"}
            onClick={() => prev()}
          >
            <ArrowBackIosNewIcon />
          </button>
          <div></div>
          <div></div>
          <button type="button" id="next" value={"Next"} onClick={() => next()}>
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
