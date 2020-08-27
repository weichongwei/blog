const router = require('koa-router')()
const jwtAuth = require('koa-jwt')
const categoryController = require('../controller/category')
router.prefix('/api/v1')

//创建分类
router.post('/category',categoryController.createCategory)

//获取分类列表
router.get('/category',categoryController.getCategory)

//更新分类
router.put('/category/:_id',jwtAuth({secret:'secret'}),categoryController.updateCategory)

//获取分类详情
router.get('/category/:_id',categoryController.getCategoryById)

//删除分类
router.delete('/category/:_id',jwtAuth({secret:'secret'}),categoryController.deleteCategory)

module.exports = router