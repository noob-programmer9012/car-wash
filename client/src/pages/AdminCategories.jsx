import { useLoaderData } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

import AdminCategoriesData from "../components/AdminCategoriesData";
import { useEffect, useState } from "react";

function AdminCategories() {
  const data = useLoaderData();
  const [editData, setEditData] = useState("");

  useEffect(() => {
    console.log(editData);
  }, [editData]);

  const showForm = () => {
    const form = document.querySelector(".card.category");
    form.style.visibility = "visible";
    form.style.opacity = 1;
    form.style.width = "400px";
  };

  return (
    <>
      <div className="category">
        <div className="admin-category-data">
          <input
            type="button"
            className="btn"
            value={"Add Category"}
            onClick={showForm}
          />
          <AdminCategoriesData
            data={data}
            action={showForm}
            setData={setEditData}
          />
        </div>
        <div className="card category">
          <CategoryForm data={editData} />
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
