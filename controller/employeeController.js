const employeeModel = require('../db/employeeSchema');

const login=(data)=>{
const login_data = employeeModel.findOne({empname:data.empname, emp_id:data.emp_id}).exec();
return login_data;
}
const getData = ()=>{
  const data = employeeModel.find({}).exec();
  return data;

}

const postData = (data)=>{
    let emp_ins = new employeeModel(data);
      emp_ins.save(err=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Data Added successfully");
        }
    })
}

const deleteData = (id)=>{
     employeeModel.deleteOne({emp_id : id},(err)=>{
        if(err) throw err;
    })
}

const updateData = (data,id) =>{
     employeeModel.updateOne({emp_id:id},{$set:data}, (err)=>{
        if(err) throw err;
    })
}

module.exports = {
    getData, postData, deleteData, updateData, login
};