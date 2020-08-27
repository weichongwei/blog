// 分类模型的创建
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
  },
  keyword: {
    type: String,
    require: true,
  },
})
const CategoryModel = mongoose.model('Category',categorySchema);
module.exports = CategoryModel;