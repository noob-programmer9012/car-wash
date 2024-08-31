import { Form, Link, useLoaderData } from "react-router-dom";

import InputField from "../components/InputField";
import { useEffect, useState } from "react";

const AddService = () => {
  const [categories, setCategories] = useState();
  const [service, setService] = useState("");

  const data = useLoaderData();

  useEffect(() => {
    if (data.data !== "No categories added yet!") setCategories(data.data);
    if (data.categories) setCategories(data.categories);
    if (data.service) setService(data.service);
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
          {service ? <h1>Edit Service</h1> : <h1>Add Service</h1>}

          <InputField
            inputName="Title"
            required
            type="text"
            value={service ? JSON.parse(service).serviceName : service}
          />
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
            value={
              service ? JSON.parse(service).plan.price.toString() : service
            }
          />
          <div className="field">
            <textarea
              rows="4"
              className="input"
              name="facilities"
              placeholder="Enter facilities by comma seperated values. e.g. Wax, Polish, Car Freshner"
              defaultValue={
                service ? JSON.parse(service).plan.facilities : service
              }
            ></textarea>
            <label
              htmlFor="Facilities"
              className="label nontext"
              id="facilities"
            >
              Facilities *
            </label>
          </div>
          <InputField
            inputName="Discount"
            type="text"
            validator="number"
            value={
              service ? JSON.parse(service).plan.discount.toString() : service
            }
          />
          <div className="field">
            <input type="file" className="input" id="image" name="file"></input>
            <label htmlFor="image" className="label nontext" id="label">
              Image Upload
            </label>
          </div>
          <button type="submit" className="btn">
            {service ? "Edit Service" : "Add Service"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddService;
