const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('./Models/db');
const employeeRouter = require('./Routes/EmployeeRoutes');

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`Employee management system is running`);
});

app.use(`/api/employees`,employeeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});