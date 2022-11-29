import { useState } from "react";
import { useNavigate } from "react-router-dom";
//@mui
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";

import Iconify from "../../components/iconify";
import Popup from "../../components/popup";

import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ITEM_PER_PAGE = 3;
const MAX_PAGE = 5;

const SYL = [
  {
    id: 1,
    description: "Sentences and common errors when making sentences",
  },
  {
    id: 2,
    description: "Sentences",
  },
  {
    id: 3,
    description: "Sentences",
  },
  {
    id: 4,
    description: "Sentences",
  },
  {
    id: 5,
    description: "Sentences",
  },
];
export default function CourseCreatePage() {
  const [notiPage, setNotiPage] = useState(0);
  const [syllabus, setSyllabus] = useState(SYL);
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/app", { replace: true });
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Tạo khóa học
        </Typography>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin khóa học
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                label="Mã khóa học"
                name="course_id"
                value=""
              />
              <TextField
                margin="normal"
                fullWidth
                label="Tên khóa học"
                name="name"
                value=""
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Loại khóa học</InputLabel>
                <Select
                  labelId="type-select-label"
                  label="Loại khóa học"
                  value=""
                >
                  <MenuItem value="OVERRALL">OVERRALL</MenuItem>
                  <MenuItem value="LISTENING">LISTENING</MenuItem>
                  <MenuItem value="READING">READING</MenuItem>
                  <MenuItem value="SPEAKING">SPEAKING</MenuItem>
                  <MenuItem value="WRITING">WRITING</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                label="Yêu cầu đầu vào"
                name="requirement"
                value=""
                type="number"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Mục tiêu đầu ra"
                name="target"
                value=""
                type="number"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Phí"
                name="cost"
                value=""
                type="number"
              />
              <Button
                variant="contained"
                startIcon={<SaveAsOutlinedIcon />}
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                Lưu khóa học
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Chương trình học</Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setOpenPopup(true)}
                >
                  Thêm buổi học
                </Button>
              </Box>
              <Paper
                elevation={3}
                sx={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                  }}
                >
                  Danh sách đã thêm
                </Typography>
                {syllabus
                  .slice(
                    notiPage * ITEM_PER_PAGE,
                    notiPage * ITEM_PER_PAGE + ITEM_PER_PAGE
                  )
                  .map((item, idx) => {
                    const { description } = item;
                    return (
                      <Box
                        sx={{
                          padding: 2,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ebf1ff",
                          borderRadius: 3,
                          mb: 2,
                          width: "100%",
                          gap: 0.5,
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, alignItems: "center" }}>
                          <IconButton color="error" size="small">
                            <RemoveCircleOutlineIcon />
                          </IconButton>

                          <Typography variant="subtitle1">
                            <em>Buổi thứ {idx + 1}</em>
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{mx: 4.5}}>{description}</Typography>
                      </Box>
                    );
                  })}
                <Pagination
                  count={MAX_PAGE}
                  color="primary"
                  onChange={(e, value) => setNotiPage(value - 1)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Popup
        title="Thêm buổi học"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Thứ tự buổi"
            name="index"
            value=""
            type="number"
          />
          <TextField
            multiline
            rows={4}
            label="Mô tả"
            name="description"
            value=""
            type="text"
            sx={{
              width: "100%",
              my: 2,
            }}
          />
          <Button
            sx={{ my: 1, height: 50, width: "30%" }}
            variant="contained"
            startIcon={<SaveAsOutlinedIcon />}
          >
            Lưu lại
          </Button>
        </Box>
      </Popup>
    </>
  );
}
