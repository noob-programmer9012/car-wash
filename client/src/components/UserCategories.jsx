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
  const [categories, setcategories] = useState();
  const navigate = useNavigate();

  function loadcategories(e) {
    const id = e.target.getAttribute("kkey") || e.target.id;
    navigate(`/categories/${id}`);
  }

  useEffect(() => {
    async function fetchCategories() {
      const url = "http://localhost:5000/getCategories";

      try {
        const data = await axios.get(url, {
          headers: {
            Authorization: "Bearer: " + token,
          },
        });
        setcategories(JSON.stringify(data.data.data));
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, [token, categories]);

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {categories &&
          JSON.parse(categories).map((categories) => {
            return (
              <Fragment key={categories._id}>
                <Grid item xs={6}>
                  <Item kkey={categories._id} onClick={loadcategories}>
                    <Typography kkey={categories._id} onClick={loadcategories}>
                      {categories.title}
                    </Typography>
                    <img
                      src={"http://localhost:5000" + categories.imageUrl}
                      width={"100px"}
                      id={categories._id}
                      onClick={loadcategories}
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
