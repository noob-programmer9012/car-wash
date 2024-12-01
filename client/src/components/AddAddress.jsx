import { Form, useActionData, useFormAction } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import InputField from "./InputField";
import { addAddress } from "../action/addAdress";
import "../css/address.css";
import { useEffect, useState } from "react";

const AddAddress = ({ setOpen }) => {
  // const data = useFormAction("order");
  const data = useActionData();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(undefined);

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input[type=string]");
    inputs.forEach((input) => {
      input.addEventListener("keydown", () => {
        setShow(false);
      });
    });

    if (data && !data.user) {
      setError(data.message);
      setShow(true);
    }

    // if (data && data.user) {
    //   setOpen(false);
    // }
  }, [data]);

  useEffect(() => {
    const errorBlock = document.querySelector(".eb");
    const error = document.querySelector(".err");
    if (show) {
      errorBlock.classList.add("show");
      error.classList.add("show");
    } else {
      errorBlock.classList.remove("show");
      error.classList.remove("show");
      setShow(false);
    }
  }, [show, error]);

  return (
    <div className="addAddressform">
      <div className="close">
        <h3>Add Address</h3>
        <CloseIcon className="closeIcon" onClick={() => setOpen(false)} />
      </div>
      <div className="eb">
        <span className="material-symbols-outlined error-icon">error</span>
        <p className="err">{error}</p>
        <span className="material-symbols-outlined close" onClick={handleClose}>
          close
        </span>
      </div>

      <Form noValidate className="Form" method="POST">
        <div>
          <div className="address-modal">
            <InputField required inputName="home No" type="string" value={""} />
            <div className="extra">
              <InputField
                required
                inputName="landmark"
                type="string"
                value={""}
              />
              <InputField required inputName="area" type="string" value={""} />
            </div>
            <div className="city">
              <InputField
                required
                inputName="pincode"
                type="string"
                value={""}
                validator="number"
              />
            </div>
            <input type="submit" className="btn" value={"Add address"} />
          </div>
        </div>
      </Form>
    </div>
  );
};

AddAddress.propTypes = {
  setClose: PropTypes.func,
};

export default AddAddress;
