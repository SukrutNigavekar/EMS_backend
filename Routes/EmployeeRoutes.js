const {createEmployee,readEmployee,
    readEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
} = require('../Controllers/EmployeeControllers');
const { cloudinaryFileUploader } = require('../Middleware/FileUploader');
const routes = require('express').Router();


routes.get('/', readEmployee);

routes.get('/:id', readEmployeeById);

routes.delete('/:id', deleteEmployeeById);

routes.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEmployeeById);

routes.post('/', cloudinaryFileUploader.single('profileImage'),createEmployee);


module.exports = routes;

