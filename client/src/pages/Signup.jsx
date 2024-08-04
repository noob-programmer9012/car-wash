import { Form, useActionData } from "react-router-dom";
import InputField from "../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "../css/signup.css";
import { useEffect, useState } from "react";

const Signup = () => {
  const actionData = useActionData();
  console.log(actionData);
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
            <InputField
              required
              inputName="fullname"
              type="string"
              value={""}
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
                />
                <InputField
                  required
                  inputName="city"
                  type="string"
                  value={""}
                />
              </div>
              <InputField
                inputName="mobile no"
                required
                type="string"
                value={""}
              />
            </div>
            <input type="submit" className="btn" value={"Submit"} />
          </div>
        </Form>
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
