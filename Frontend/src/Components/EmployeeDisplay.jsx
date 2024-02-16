import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Box, CssBaseline, Paper, Typography } from "@mui/material";
import axios from "axios";

const EmployeeDisplay = () => {
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
    border-radius: 10px;
    background: white;
    color: black;
  `;

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getEmployees");
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "90%",
          color: "white",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <StyledPaper elevation={24}>
          <Typography component="h1" variant="h5" gutterBottom>
            Employee Data Display
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              flexWrap: "wrap",
              gap: "25px",
            }}
          >
            {employeeData.map((employee, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexBasis: "calc(25% - 20px)",
                }}
              >
                <Avatar
                  alt={`Employee ${index}`}
                  src={employee.photoLink}
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  {`${employee.firstName} ${employee.lastName}`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic" }}
                >{`ID: ${employee.employeeId}`}</Typography>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic" }}
                >{`Position: ${employee.position}`}</Typography>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic" }}
                >{`Gender: ${employee.gender}`}</Typography>
              </div>
            ))}
          </Box>
        </StyledPaper>
      </Box>
    </div>
  );
};

export default EmployeeDisplay;
