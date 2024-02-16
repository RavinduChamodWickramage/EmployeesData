import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import axios from "axios";

const StyledPaper = styled(Paper)`
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 1px solid transparent;
  border-image: linear-gradient(to right, #854ce6, #3498db);
  border-image-slice: 1;
  border-radius: 25px;
  background: white;
  color: black;
`;

const EmployeeEnter = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    employeeId: "",
    photoLink: "",
    position: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/addEmployee", formData);
      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        employeeId: "",
        photoLink: "",
        position: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      employeeId: "",
      photoLink: "",
      position: "",
    });
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "50%",
          color: "white",
          margin: "auto",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <StyledPaper elevation={24}>
          <Typography component="h1" variant="h5">
            Employee Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="employeeId"
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    required
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="photoLink"
                  required
                  fullWidth
                  id="photo"
                  label="Insert Photo Link"
                  value={formData.photoLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="position"
                  label="Employee Position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
      </Box>
    </div>
  );
};

export default EmployeeEnter;
