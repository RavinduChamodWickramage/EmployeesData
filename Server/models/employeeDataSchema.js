import mongoose from "mongoose";

const employeeDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    minLength: [3, "First name must be at least 3 characters long"],
    maxLength: [30, "First name cannot exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    minLength: [3, "Last name must be at least 3 characters long"],
    maxLength: [30, "Last name cannot exceed 30 characters"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Please provide the gender"],
  },
  employeeId: {
    type: String,
    required: [true, "Please provide the employee ID"],
    unique: true,
  },
  photoLink: {
    type: String,
    required: [true, "Please provide the photo link"],
    validate: {
      validator: (value) => {
        // Custom validation logic for photoLink
        // Example: Validate that the link starts with "http://" or "https://"
        return /^(https?:\/\/).+/.test(value);
      },
      message:
        "Please provide a valid photo link starting with http:// or https://",
    },
  },
  position: {
    type: String,
    required: [true, "Please provide the employee's position"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define custom methods or additional configuration here

const Employees = mongoose.connection.useDb("Employees");

const Employee = Employees.model("Employee", employeeDataSchema);

export default Employee;
