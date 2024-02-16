import express from "express";
import { addEmployee } from "../controller/employeeData.js";

const router = express.Router();

// Route to add a new employee
router.post("/add", addEmployee);

export default router;
