import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Search,
  MeetingRoom,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";

const getAvailabilityColor = (status) => {
  switch (status) {
    case "Dirty":
      return "error";
    case "Vacant":
      return "success";
    case "Occupied":
      return "primary";
    case "Reserved":
      return "warning";
    default:
      return "default";
  }
};

export default function RoomsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "",
    floor: "",
    bed: "",
    capacity: "",
    availability: "Vacant",
    description: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('https://staytrack.onrender.com/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleOpen = () => {
    setEditMode(false);
    setNewRoom({
      number: "",
      type: "",
      floor: "",
      bed: "",
      capacity: "",
      availability: "Vacant",
      description: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async () => {
    try {
      if (editMode) {
        await axios.put(`https://staytrack.onrender.com/rooms/${currentRoomId}`, newRoom);
      } else {
        await axios.post('https://staytrack.onrender.com/rooms', newRoom);
      }
      fetchRooms();
      handleClose();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleEditRoom = (room) => {
    setEditMode(true);
    setCurrentRoomId(room._id);
    setNewRoom(room);
    setOpen(true);
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`https://staytrack.onrender.com/rooms/${id}`);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.number.toString().includes(search) ||
    room.type.toLowerCase().includes(search.toLowerCase()) ||
    room.floor.toLowerCase().includes(search.toLowerCase()) ||
    room.bed.toLowerCase().includes(search.toLowerCase()) ||
    room.availability.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <main style={{ flexGrow: 1, padding: 24 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Rooms
            </Typography>
            <Button
              variant="contained"
              startIcon={<MeetingRoom />}
              sx={{ mr: 2 }}
              onClick={() => navigate("/room-placement")}
            >
              Room Placement
            </Button>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
        </AppBar>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ mt: 2 }}
          onClick={handleOpen}
        >
          Add a new room
        </Button>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room No</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Room Floor</TableCell>
                <TableCell>Bed Type</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell>{room.number}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.bed}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>
                    <Chip
                      label={room.availability}
                      color={getAvailabilityColor(room.availability)}
                    />
                  </TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditRoom(room)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRoom(room._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? "Edit Room" : "Add a New Room"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Room Number"
              name="number"
              value={newRoom.number}
              onChange={handleChange}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Room Type"
              name="type"
              value={newRoom.type}
              onChange={handleChange}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Floor"
              name="floor"
              value={newRoom.floor}
              onChange={handleChange}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Bed Type"
              name="bed"
              value={newRoom.bed}
              onChange={handleChange}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Capacity"
              name="capacity"
              type="number"
              value={newRoom.capacity}
              onChange={handleChange}
              sx={{ my: 1 }}
            />
            <Select
              fullWidth
              name="availability"
              value={newRoom.availability}
              onChange={handleChange}
              sx={{ my: 1 }}
            >
              <MenuItem value="Vacant">Vacant</MenuItem>
              <MenuItem value="Occupied">Occupied</MenuItem>
              <MenuItem value="Reserved">Reserved</MenuItem>
              <MenuItem value="Dirty">Dirty</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newRoom.description}
              onChange={handleChange}
              sx={{ my: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddRoom} variant="contained">
              {editMode ? "Save Changes" : "Add Room"}
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}