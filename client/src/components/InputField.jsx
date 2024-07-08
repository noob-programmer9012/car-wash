import PropTypes from "prop-types";

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
    label.style.color = "#884925";
    label.style.fontSize = "1rem";
  }
};

const handleClick = (e) => {
  const label = e.target.nextElementSibling;
  label.style.top = "-20px";
  label.style.left = "10px";
  label.style.fontSize = "0.8rem";
  label.style.color = "#ffffffde";
};

function InputField({ inputName }) {
  return (
    <>
      <div className="field">
        <input
          type="text"
          className={`input ${inputName}`}
          id={inputName}
          name={inputName}
          onChange={handleChange}
          onClick={handleClick}
        ></input>
        <label htmlFor={inputName} className="label" id="label">
          Title *
        </label>
      </div>
    </>
  );
}

InputField.propTypes = { inputName: PropTypes.string.isRequired };

export default InputField;
