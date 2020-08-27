const router = require('koa-router')()
const jwtAuth = require('koa-jwt')
const AdvertiseController = require('../controller/advertise')
router.prefix('/api/v1')

 //创建文章
 router.post('/advertise',jwtAuth({secret:'secret'}), AdvertiseController.createAdvertise);
  // 获取所有广告列表
  router.get('/advertise', AdvertiseController.getAdvertiseList);
  // 获取广告详情
  router.get('/advertise/:_id', AdvertiseController.getAdvertiseDetailById)
  // 更新广告
  router.put('/advertise/:_id', jwtAuth({secret:'secret'}), AdvertiseController.updateAdvertiseById)
  // 删除广告
  router.delete('/advertise/:_id', jwtAuth({secret:'secret'}), AdvertiseController.deleteAdvertiseById)
module.exports = router