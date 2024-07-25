import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { PropTypes } from "prop-types";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AdminCategoriesData = ({ data, action, setData }) => {
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

  JSON.parse(data["data"]).map((category) => {
    rows.push({
      id: category._id,
      title: category.title,
      image: category.imageUrl ? category.imageUrl : "Not Available",
      video: category.videoUrl ? category.videoUrl : "Not Available",
    });
  });

  return (
    <>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Category Name</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Video</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.image}</StyledTableCell>
              <StyledTableCell align="right">{row.video}</StyledTableCell>
              <StyledTableCell align="right">
                <div
                  className="actions"
                  // id={row.id}
                  // onClick={(e) => setData(e.target.id)}
                >
                  <div
                    className="edit"
                    // id={row.id}
                    // onClick={(e) => {
                    //   action();
                    //   setData(e.target.id);
                    // }}
                  >
                    <EditIcon
                      id={row.id}
                      onClick={(e) => {
                        action();
                        setData(e.target.id);
                      }}
                    />
                  </div>
                  <div className="delete">
                    <DeleteForeverIcon />
                  </div>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

AdminCategoriesData.propTypes = {
  data: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

export default AdminCategoriesData;
