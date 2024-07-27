import {
  styled,
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
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import titleCase from "../utils/titleCase";

const AdminCategoriesData = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

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

  {
    data &&
      JSON.parse(data["data"]).map((category) => {
        rows.push({
          id: category._id,
          title: category.title,
          image: category.imageUrl ? category.imageUrl : "Not Available",
          video: category.videoUrl ? category.videoUrl : "Not Available",
        });
      });
  }
  return (
    <>
      <div className="admin-category-data">
        <Link to="add-category">
          <input type="button" className="btn" value={"Add Category"} />
        </Link>
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
                <StyledTableCell align="right">
                  {titleCase(row.title)}
                </StyledTableCell>
                <StyledTableCell align="right">{row.image}</StyledTableCell>
                <StyledTableCell align="right">{row.video}</StyledTableCell>
                <StyledTableCell align="right">
                  <div className="actions">
                    <div
                      className="edit"
                      id={row.id}
                      onClick={(e) => navigate(`edit-category/${e.target.id}`)}
                    >
                      <EditIcon
                        id={row.id}
                        onClick={(e) =>
                          navigate(`edit-category/${e.target.id}`)
                        }
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
      </div>
    </>
  );
};

export default AdminCategoriesData;
