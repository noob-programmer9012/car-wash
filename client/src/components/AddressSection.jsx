import { useRouteLoaderData } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";

const AddressSection = ({
  id,
  selectedAddress,
  setSelectedAddress,
  primaryAddress,
}) => {
  const user = useRouteLoaderData("root");
  const handleChange = (e) => {
    setSelectedAddress({
      ...selectedAddress,
      [id]: e.target.value,
    });
  };

  return (
    <div className="selectAddress">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Select Address
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={primaryAddress}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value={primaryAddress}
            control={<Radio />}
            label={primaryAddress}
            onClick={(e) => handleChange(e)}
          />
          {user.secondaryAddress.map((address, index) => {
            return (
              <div key={index}>
                <FormControlLabel
                  value={`${address.buildingDetails}, ${address.landmark}, ${address.area}`}
                  control={<Radio />}
                  onClick={(e) => handleChange(e)}
                  label={`${address.buildingDetails}, ${address.landmark}, ${address.area}`}
                />
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

AddressSection.propTypes = {
  id: PropTypes.string.isRequired,
  selectedAddress: PropTypes.object,
  setSelectedAddress: PropTypes.func.isRequired,
  primaryAddress: PropTypes.string.isRequired,
};

export default AddressSection;
