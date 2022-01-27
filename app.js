const express = require('express');
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employee', employeeRoutes);

app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})