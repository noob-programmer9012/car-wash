import styled from "@emotion/styled";
import { Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";

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

const CustomTable = ({ rows, columns }) => {
  return (
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
       <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            {
              columns.map(c => (
                <Fragment key={c}>
                  <StyledTableCell>{c}</StyledTableCell>
                </Fragment>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map((row, index) => {
            return (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{ index + 1 }</StyledTableCell>
                {                  
                  columns.map((col, index) => {
                    return (
                      <Fragment key={index}>
                        <StyledTableCell>{row[col]}</StyledTableCell>
                      </Fragment>
                    )
                  })
                }
              </StyledTableRow>
            )
          })
          }
        </TableBody>
    </Table>
  )
}

CustomTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default CustomTable
