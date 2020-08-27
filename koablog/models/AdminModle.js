const mongoose = require('mongoose');
//导入密码加盐
const saltRounds = 10;
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set:(val)=>{     //密码加盐处理
            const salt = bcrypt.genSaltSync(saltRounds);
            const pass = bcrypt.hashSync(val, salt);
            return pass;
        }
    }
})

const adminModle = mongoose.model('admin',adminSchema)

module.exports = adminModle