import axios from "axios";
import { Form, useSubmit } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

import InputField from "./InputField";
import { useEffect, useState } from "react";
import { redirectToLogin } from "../utils/redirect";

function CategoryForm({ data }) {
  const submit = useSubmit();
  const [category, setCategory] = useState();
  const token = "Bearer: " + useSelector((state) => state.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(e.target.form);
    e.target.form.reset();
  };

  useEffect(() => {
    // make api call
    const id = data;
    const url = `http://localhost:5000/admin/getCategory/${id}`;

    async function loadService() {
      if (data) {
        try {
          const service = await axios.get(url, {
            headers: {
              Authorization: token,
            },
          });
          setCategory(JSON.stringify(service.data.data));
        } catch (error) {
          return redirectToLogin(error);
        }
      }
    }
    loadService();
  }, [data, token, category]);

  return (
    <>
      <Form
        noValidate
        className="form category"
        method="POST"
        encType="multipart/form-data"
        replace
      >
        <h1>Add Category</h1>
        <InputField inputName="Category Name" type="text" required />
        <div className="field">
          <input
            type="file"
            className="input image/svg"
            id="svg"
            name="file"
            required
          />
        </div>
        <div className="field">
          <input
            type="file"
            className="input video"
            id="video"
            name="file"
          ></input>
        </div>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Add Category
        </button>
      </Form>
    </>
  );
}

CategoryForm.propTypes = { data: PropTypes.string.isRequired };

export default CategoryForm;
