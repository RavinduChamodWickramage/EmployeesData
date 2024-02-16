import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import Employee from "./models/employeeDataSchema.js"; // Import the Employee model

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });

app.use(bodyParser.json());
app.use(cors());

// Establish database connection
dbConnection(process.env.MONGODB_URL);

// Route to add a new employee
app.post("/addEmployee", async (req, res) => {
  const newEmployeeData = req.body;
  try {
    // Save new employee data to MongoDB using the Employee model
    const newEmployee = await Employee.create(newEmployeeData);
    console.log("Employee added:", newEmployee);
    res.json({ success: true, data: newEmployee }); // Send the newly created employee data in the response
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Failed to add employee" });
  }
});

// Route to get all employees
app.get("/getEmployees", async (req, res) => {
  try {
    // Fetch all employees from MongoDB using the Employee model
    const employees = await Employee.find({});
    res.json(employees); // Send the fetched employees in the response
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch employees" });
  }
});

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
});
