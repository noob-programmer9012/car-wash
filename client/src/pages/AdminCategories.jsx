import { Fragment, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";
import { Button } from "@mui/material";

function AdminCategories() {
  const [categories, setCategories] = useState();
  const data = useLoaderData();

  const showForm = () => {
    const form = document.querySelector(".card.category");
    form.style.visibility = "visible";
    form.style.opacity = 1;
  };

  useEffect(() => {
    if (data.data !== '"No categories added yet!"') setCategories(data.data);
  }, [data, categories]);

  return (
    <>
      <div className="category">
        <div className="category-data">
          <Button onClick={showForm} variant="contained">
            Add
          </Button>
          {categories ? (
            JSON.parse(categories).map((category) => {
              return (
                <Fragment key={category._id}>
                  <div className="data">
                    <h1>{category.title}</h1>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <h1>No Categories added yet....!</h1>
          )}
        </div>
        <div className="card category">
          <CategoryForm />
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
