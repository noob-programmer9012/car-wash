import styled from "@emotion/styled";
import { Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

const CustomTable = ({ rows, columns, edit, del }) => {
  return (
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="right">ID</StyledTableCell>
          {
            columns.map(c => (
              <Fragment key={c}>
                <StyledTableCell align="right">{c}</StyledTableCell>
              </Fragment>
            ))
          }
          {(edit || del) && <StyledTableCell align="right">Actions</StyledTableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {
          rows.map((row, index) => {
            return (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="right">{index + 1}</StyledTableCell>
                {
                  columns.map((col, index) => {
                    return (
                      <Fragment key={index}>
                        <StyledTableCell align="right">{row[col]}</StyledTableCell>
                      </Fragment>
                    )
                  })
                }
                <StyledTableCell align="right">
                  <div className="actions">
                    {edit &&
                      <div
                        className="edit"
                        onClick={() => alert(row.id)}
                      >
                        <EditIcon />
                      </div>
                    }
                    {del &&
                      <div
                        className="delete"
                        onClick={() => handleDelete(row.serviceName, row.id)}
                      >
                        <DeleteForeverIcon />
                      </div>
                    }
                  </div>
                </StyledTableCell>
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
  columns: PropTypes.array.isRequired,
  edit: PropTypes.bool,
  del: PropTypes.bool
};

export default CustomTable
