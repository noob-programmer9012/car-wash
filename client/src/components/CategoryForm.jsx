import { Form, Link, useLoaderData } from "react-router-dom";

import InputField from "./InputField";
import { useEffect, useState } from "react";

function CategoryForm() {
  const data = useLoaderData();
  const [title, setTitle] = useState("");

  useEffect(() => {
    data && setTitle(data["data"].title);
  }, [data]);

  return (
    <>
      <div className="card">
        <Form
          noValidate
          className="form category"
          method="POST"
          encType="multipart/form-data"
          replace
        >
          <Link to="..">Back</Link>

          {data ? <h1>Edit Category</h1> : <h1>Add Category</h1>}
          {data && <p>{data.message}</p>}
          <InputField
            inputName="Category Name"
            type="text"
            required
            value={title}
          />
          <div className="field">
            <input
              type="file"
              className="input image/svg"
              id="svg"
              name="file"
              required
              accept={"image/svg+xml"}
            />
          </div>
          <div className="field">
            <input
              type="file"
              className="input video"
              id="video"
              name="file"
              accept={"video/webm"}
            ></input>
          </div>
          <button type="submit" className="btn">
            {data ? "Edit Category" : "Add Category"}
          </button>
        </Form>
      </div>
    </>
  );
}

export default CategoryForm;
