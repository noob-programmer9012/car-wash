import PropTypes from "prop-types";

function InputField({ inputName, type, required, validator }) {
  const handleChange = (e) => {
    const label = e.target.nextElementSibling;
    if (e.target.value !== "") {
      label.style.top = "-20px";
      label.style.left = "10px";
      label.style.fontSize = "0.8rem";
      label.style.color = "#ffffffde";
    }
    if (e.target.value === "") {
      label.style.top = "17px";
      label.style.left = "20px";
      if (required) label.style.color = "#884925";
      label.style.fontSize = "1rem";
    }

    if (validator === "number") {
      const onlyNum = e.target.value.replace(/[^0-9.]/g, "");
      e.target.value = onlyNum;
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
        ></input>
        <label htmlFor={inputName} className="label" id="label">
          {required ? `${inputName} *` : inputName}
        </label>
      </div>
    </>
  );
}

InputField.propTypes = {
  inputName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.string,
};

export default InputField;
