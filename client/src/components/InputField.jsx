import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import titleCase from "../utils/titleCase";

function InputField({ inputName, type, required, validator, value, accept }) {
  const [val, setVal] = useState(value ? value : "");
  // console.log(value, val);
  useEffect(() => {
    setVal(value);
  }, [value]);

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      if (input.value) {
        const label = input.nextElementSibling;
        if (label) {
          label.style.top = "-20px";
          label.style.left = "10px";
          label.style.fontSize = "0.8rem";
          label.style.color = "#ffffffde";
        }
      }
    });
  }, [val]);

  const handleChange = (e) => {
    setVal(e.target.value);

    const label = e.target.nextElementSibling;
    setVal(e.target.value);
    if (e.target.value !== "") {
      label.style.top = "-20px";
      label.style.left = "10px";
      label.style.fontSize = "0.8rem";
      label.style.color = "#ffffffde";
    }
    if (e.target.value === "") {
      label.style.top = "17px";
      label.style.left = "20px";
      if (required) label.style.color = "#ff2525";
      label.style.fontSize = "1rem";
    }

    if (validator === "number") {
      const onlyNum = e.target.value.replace(/[^0-9.]/g, "");
      setVal(onlyNum);
    } else if (validator === "character") {
      const onlyChar = e.target.value.replace(/[^a-zA-Z ]/g, "");
      setVal(onlyChar);
    }
  };

  const handleClick = (e) => {
    const label = e.target.nextElementSibling;
    label.style.top = "-20px";
    label.style.left = "10px";
    label.style.fontSize = "0.8rem";
    label.style.color = "#ffffffde";
  };

  const leave = (e) => {
    const label = e.target.nextElementSibling;

    if (e.target.value === "") {
      label.style.top = "17px";
      label.style.left = "20px";
      if (required) label.style.color = "#884925";
      label.style.fontSize = "1rem";
    }
  };

  return (
    <>
      <div className="field">
        <input
          type={type}
          className={`input ${inputName}`}
          id={inputName}
          name={inputName}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={leave}
          value={val}
          accept={accept}
        ></input>
        {!type !== "hidden" && (
          <label htmlFor={inputName} className="label" id="label">
            {required ? `${titleCase(inputName)} *` : titleCase(inputName)}
          </label>
        )}
      </div>
    </>
  );
}

InputField.propTypes = {
  inputName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.string,
  value: PropTypes.string,
  accept: PropTypes.string,
};

export default InputField;
