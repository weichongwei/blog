const router = require('koa-router')()
const AdminController = require('../controller/admin')
const jwtAuth = require('koa-jwt')
router.prefix('/api/v1')
//用户注册
router.post('/admin/register', AdminController.createAdmin)

//用户登录
router.post('/admin/login',AdminController.login)

//获取用户信息
router.get('/admin/getUser',jwtAuth({secret:'secret'}),AdminController.getUser)


module.exports = router
