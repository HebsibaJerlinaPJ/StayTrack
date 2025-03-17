import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit, SwapHoriz } from "@mui/icons-material";

export default function StaffTable() {
  const [search, setSearch] = useState("");
  const [staffData, setStaffData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", shift: "", salary: "" });
  const [loading, setLoading] = useState(true);

  // Fetch staff data from API
  const fetchStaffData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees/all");
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleOpen = (staff = null) => {
    setSelectedStaff(staff);
    setFormData(staff || { name: "", role: "", shift: "", salary: "" });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  // Save (Add or Update) Employee
  const handleSave = async () => {
    try {
      let updatedStaff;
      if (selectedStaff) {
        const response = await axios.put(
          `http://localhost:5000/api/employees/edit/${selectedStaff._id}`,
          formData
        );
        updatedStaff = staffData.map((staff) =>
          staff._id === selectedStaff._id ? response.data : staff
        );
      } else {
        const response = await axios.post("http://localhost:5000/api/employees/add", formData);
        updatedStaff = [...staffData, response.data];
      }
      setStaffData(updatedStaff);
      handleClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/delete/${id}`);
      setStaffData((prevData) => prevData.filter((staff) => staff._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Change Shift (Day/Night)
  const handleChangeShift = async (id, currentShift) => {
    const newShift = currentShift === "Day" ? "Night" : "Day";
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/employees/change-shift/${id}`,
        { shift: newShift }
      );
      setStaffData((prevData) =>
        prevData.map((staff) => (staff._id === id ? { ...staff, shift: newShift } : staff))
      );
    } catch (error) {
      console.error("Error changing shift:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Staff Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Employee
        </Button>
      </Box>

      <TextField
        label="Search Employee"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading Indicator */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                <TableCell sx={{ color: "white" }}>#</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Role</TableCell>
                <TableCell sx={{ color: "white" }}>Shift</TableCell>
                <TableCell sx={{ color: "white" }}>Salary</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffData
                .filter((staff) => staff.name.toLowerCase().includes(search.toLowerCase()))
                .map((staff, index) => (
                  <TableRow key={staff._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={staff.shift === "Day" ? "success" : "secondary"}
                        size="small"
                        onClick={() => handleChangeShift(staff._id, staff.shift)}
                      >
                        {staff.shift} <SwapHoriz sx={{ ml: 1 }} />
                      </Button>
                    </TableCell>
                    <TableCell>{staff.salary}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleOpen(staff)}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(staff._id)}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Employee Form Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedStaff ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.role}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Shift"
            name="shift"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.shift}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.salary}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
