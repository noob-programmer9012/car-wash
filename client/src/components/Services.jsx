import { Link, useLoaderData } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";

const ServicesComponent = () => {
  const data = useLoaderData();
  // console.log(JSON.parse(data));

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
      facilities: service.plan.facilities,
    });
  });

  return (
    <>
      <Link to="/admin/services/add-service">Add</Link>

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Service Name</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Facilities</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.serviceName}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.facilities}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ServicesComponent;
