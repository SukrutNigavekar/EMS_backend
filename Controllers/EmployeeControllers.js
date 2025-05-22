const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file.path : null;
    console.log(body);
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: `Employee created successfully`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};
const updateEmployeeById = async (req, res) => {
  try {
    const { name, phone, email, salary, department } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      phone,
      email,
      salary,
      department,
      updatedAt: Date.now(),
    };
    if (req.file) {
      updateData.profileImage = req.file.path;
    }
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(201).json({
      message: `Employee updated successfully`,
      success: true,
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};
const readEmployee = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;
    let searchCriteria = {};
    if (search) {
      searchCriteria.name = {
        $regex: search,
        $options: "i",
      };
    }
    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);
    const emps = await EmployeeModel.find(searchCriteria)
    .skip(skip)
    .limit(limit)
    .sort({updatedAt: -1});
    const totalPages = Math.ceil(totalEmployees / limit);
    res.status(200).json({
      message: `All Employees`,
      success: true,
      data: {
        employees: emps,
        pagination:{
            totalEmployees,
            currentPage: page,
            totalPages,
            pageSize: limit
        }
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const readEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });
    res.status(200).json({
      message: `The employee details`,
      success: true,
      data: emp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: `Employee detail deleted`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createEmployee,
  readEmployee,
  readEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};
