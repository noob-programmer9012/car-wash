import { Grid, Paper, styled, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ccc",
  ...theme.typography.body2,
  padding: "1rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  cursor: "pointer",
}));

function UserCategories({ token }) {
  const [services, setServices] = useState();
  const navigate = useNavigate();

  function loadService(e) {
    const id = e.target.getAttribute("kkey");
    navigate(`/services/${id}`);
  }

  useEffect(() => {
    async function fetchServies() {
      const url = "http://localhost:5000/getServices";

      try {
        const data = await axios.get(url, {
          headers: {
            Authorization: "Bearer: " + token,
          },
        });
        setServices(JSON.stringify(data.data.data));
      } catch (error) {
        console.log(error);
      }
    }

    fetchServies();
  }, [token]);

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {services &&
          JSON.parse(services).map((service) => {
            return (
              <Fragment key={service._id}>
                <Grid item xs={6}>
                  <Item kkey={service._id} onClick={loadService}>
                    <Typography>{service.serviceName}</Typography>
                    <img
                      src={"http://localhost:5000/assets/svg/car.svg"}
                      width={"50px"}
                    ></img>
                  </Item>
                </Grid>
              </Fragment>
            );
          })}
      </Grid>
    </>
  );
}

UserCategories.propTypes = { token: PropTypes.string.isRequired };

export default UserCategories;
