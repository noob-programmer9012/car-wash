import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const ServicesComponent = () => {
  const [services, setServices] = useState();
  const data = useLoaderData();

  useEffect(() => {
    if (data.data !== '"No services added yet."') setServices(data.data);
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "serviceName",
      headerName: "Service name",
      width: 150,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: false,
    },
    {
      field: "facilities",
      headerName: "Facilities",
      width: 150,
      editable: false,
    },
  ];

  let rows = [];

  {
    services ? (
      JSON.parse(services).map((service) => {
        rows.push({
          id: service._id,
          serviceName: service.serviceName,
          price: service.plan.price,
          facilities: service.plan.facilities,
        });
      })
    ) : (
      <h1>No services added yet...!</h1>
    );
  }

  // const rows = [
  //   { id: 1, serviceName: "Hybrid", price: 499, facilities: ["wax", "polish"] },
  // ];

  return (
    <>
      <Link to="/admin/services/add-service">Add</Link>

      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: 400,
            fontSize: "18px",
            color: "#000",
            backgroundColor: "rgba(5, 2, 66, 0.08)) !important",
            alignItems: "space-between !important",
          },
          "&.MuiDataGrid-root": {
            border: "none",
            borderRadius: "20px",
            background: "transparent",
            color: "#fff",
            fontSize: "16px",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

      {/* {services ? (
        JSON.parse(services).map((service) => {
          return (
            <Fragment key={service._id}>
              <h1>{service.serviceName}</h1>
            </Fragment>
          );
        })
      ) : (
        <h1>No services added yet...!</h1>
      )}
      <img
        src={"http://localhost:5000/assets/svg/car.svg"}
        width={150}
        height={150}
      ></img>
      <video
        src={
          "http://localhost:5000/assets/videos/Screencast from 2024-05-24 13-58-48.webm"
        }
        width={100}
        height={100}
        autoPlay
        muted
      ></video> */}
    </>
  );
};

export default ServicesComponent;
