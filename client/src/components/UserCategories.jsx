import { Grid, Paper, styled, Typography } from "@mui/material";
import { Fragment } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

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

function UserCategories() {
  const navigate = useNavigate();
  const categories = useLoaderData();

  function loadcategories(e) {
    const id = e.target.getAttribute("kkey") || e.target.id;
    navigate(`/categories/${id}`);
  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {categories.data &&
          categories.data.map((categories) => {
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

export default UserCategories;
