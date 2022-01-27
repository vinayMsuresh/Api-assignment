const express = require('express');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const jwtsecret = 'kjfkjdfkdkfdf';
const validateUser = require('../controller/validate');
const router = express.Router();
const {getData, postData, deleteData, updateData, login} = require('../controller/employeeController');
db();

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                next();
            }
        })
    }
}

router.post('/login',validateUser,(req, res)=>{
    let login_data = login({emp_id: req.body.emp_id, empname: req.body.empname});
    login_data.then(response=>{
        if(response!== null){
            let payload={
                uid:req.body.emp_id
            }
            const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
            res.json({err:0, msg: "Logged in successfully","token":token})
        }
        else{
            res.json({err:1, msg:"Login failed"})
        }
    })
    

})
router.get('/getdata', authenticateToken,(req, res)=>{
    let data = getData();
   data.then(response=>{
    res.json({data:response});
   })
})
router.post('/postdata',validateUser,(req, res)=>{
    const postdata =  postData(req.body);
    res.send("Employee added successfully");
})
router.delete('/delete/:id',authenticateToken, (req, res)=>{
    let id = req.params.id;
    deleteData(id);
    res.send("Employee deleed successfully");
})

router.put('/update/:id',authenticateToken,validateUser,
 (req, res)=>{
    let id = req.params.id;
    updateData(req.body, id);
    res.send("Employee Updated successfully")
})


module.exports = router;