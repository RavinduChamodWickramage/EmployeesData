import ErrorHandler from "../middlewares/error.js";
import { EmployeeData } from "../models/employeeDataSchema.js";

export const addEmployee = async (req, res, next) => {
  const { firstName, lastName, gender, employeeId, photoLink, position } =
    req.body;

  // Check if all required fields are present
  if (
    !firstName ||
    !lastName ||
    !gender ||
    !employeeId ||
    !photoLink ||
    !position
  )
    return next(ErrorHandler("All fields are required", 400));

  try {
    // Create a new employee data document
    await EmployeeData.create({
      firstName,
      lastName,
      gender: gender === "Male" ? "Male" : "Female",
      employeeId,
      photoLink,
      position,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Employee Data Sent Successfully",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // Handle other errors
    return next(error);
  }
};
