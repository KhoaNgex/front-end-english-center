import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

//@mui
import {
  Card,
  Button,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import ConfirmPopup from "../../components/confirm-popup";
import ListHead from "../../components/list-head";

const TABLE_HEAD = [
  { id: "course_id", label: "Mã khóa", align: "left" },
  { id: "name", label: "Tên khóa", align: "left" },
  { id: "type", label: "Loại", align: "left" },
  { id: "requirement", label: "Yêu cầu", align: "center" },
  { id: "target", label: "Mục tiêu", align: "center" },
  { id: "cost", label: "Phí", align: "left" },
  { id: "num_of_lec", label: "Số buổi", align: "center" },
  { id: "option" },
];

export default function CourseAdminPage() {
  const navigate = useNavigate();

  const navToCreate = () => {
    navigate("/app/course-create", { replace: true });
  };

  const navToEdit = () => {
    navigate("/app/course-edit", { replace: true });
  };

  const navToClass = () => {
    navigate("/app/class-admin", { replace: true });
  };

  //-------------------------------------------------------------
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/list")
      .then((res) => {
        var myList = res.data.myList;
        setCourseList(myList);
        console.log(myList);
      })
      .catch((error) => console.log(error));
  }, []);

  //--------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  //--------------------------------------
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  //--------------------------------------
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseList.length) : 0;
  //--------------------------------------

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Danh sách khóa học
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={navToCreate}
          >
            Tạo khóa học
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {courseList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((course, idx) => {
                      const {
                        course_id,
                        name,
                        type,
                        requirement,
                        target,
                        cost,
                        numOfLecture,
                      } = course;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{course_id}</TableCell>

                          <TableCell align="left">{name}</TableCell>

                          <TableCell align="left">{type}</TableCell>

                          <TableCell align="center">{requirement}</TableCell>

                          <TableCell align="center">{target}</TableCell>

                          <TableCell align="left">{cost}</TableCell>

                          <TableCell align="center">{numOfLecture}</TableCell>

                          <TableCell
                            align="left"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{ fontSize: "13px", borderRadius: 30 }}
                              onClick={navToClass}
                            >
                              Xem lớp
                            </Button>
                            <IconButton onClick={() => setOpenConfirm(true)}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={navToEdit}>
                              <BorderColorIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courseList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        content="Bạn có chắc chắn muốn xóa khóa học này?"
      />
    </>
  );
}
