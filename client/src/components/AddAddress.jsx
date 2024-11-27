import { Form, useFormAction } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import InputField from "./InputField";
import { addAddress } from "../action/addAdress";
import "../css/address.css";

const AddAddress = ({ setOpen }) => {
  const data = useFormAction("order");

  return (
    <div className="addAddressform">
      <div className="close">
        <h3>Add Address</h3>
        <CloseIcon className="closeIcon" onClick={() => setOpen(false)} />
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
