import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import titleCase from "../utils/titleCase";

const ServicesComponent = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  // console.log(JSON.parse(data));

  const handleDelete = async (title, id) => {
    let d = window.confirm(`Do you really want to delete ${title}?`);
    if (d) {
      alert("deleted " + id);
    } else {
      alert("not");
    }
  };

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#212529",
      color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#fff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#fff",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const rows = [];

  JSON.parse(data).map((service) => {
    rows.push({
      id: service._id,
      serviceName: service.serviceName,
      price: service.plan.price,
      facilities: titleCase(service.plan.facilities.toString()),
    });
  });

  return (
    <>
      <div className="services">
        <Link to="/admin/services/add-service">
          <input type="button" className="btn" value={"Add Service"} />
        </Link>

        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Service Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Facilities</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.serviceName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.facilities}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div className="actions">
                    <div
                      className="edit"
                      onClick={() => navigate(`edit-service/${row.id}`)}
                    >
                      <EditIcon />
                    </div>
                    <div
                      className="delete"
                      onClick={() => handleDelete(row.serviceName, row.id)}
                    >
                      <DeleteForeverIcon />
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ServicesComponent;
