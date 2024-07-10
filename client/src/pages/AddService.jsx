import { Form, Link, useLoaderData } from "react-router-dom";

import InputField from "../components/InputField";
import { useEffect, useState } from "react";

const AddService = () => {
  const [categories, setCategories] = useState();
  const data = useLoaderData();

  useEffect(() => {
    if (data.data !== '"No categories added yet!"') setCategories(data.data);
  }, [data]);

  return (
    <>
      <div className="card">
        <Form
          noValidate
          method="POST"
          encType="multipart/form-data"
          className="form category"
        >
          <Link to="..">Back</Link>
          <h1>Add Service</h1>

          <InputField inputName="Title" required type="text" />
          <div className="field">
            <select name="categories" id="categories" className="input">
              {categories ? (
                JSON.parse(categories).map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  );
                })
              ) : (
                <option>Please add categories</option>
              )}
            </select>
            <label htmlFor="categories" className="label nontext" id="label">
              Category *
            </label>
          </div>
          <InputField
            inputName="Price"
            type="text"
            validator="number"
            required
          />
          <div className="field">
            <textarea
              rows="4"
              className="input"
              name="facilities"
              placeholder="Enter facilities by comma seperated values. e.g. Wax, Polish, Car Freshner"
            ></textarea>
          </div>
          <InputField inputName="Discount" type="text" validator="number" />
          <div className="field">
            <select name="validity" id="validity" className="input">
              <option value="year">Yearly</option>
              <option value="month">Monthly</option>
              <option value="one time">One Time</option>
            </select>
            <label htmlFor="validity" className="label nontext" id="label">
              Validity *
            </label>
          </div>
          <div className="field">
            <input type="file" className="input" id="image" name="file"></input>
            <label htmlFor="image" className="label nontext" id="label">
              Image Upload
            </label>
          </div>
          <button type="submit" className="btn">
            Add Service
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddService;
