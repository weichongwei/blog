const router = require('koa-router')()
const jwtAuth = require('koa-jwt')
const ReplyController = require('../controller/reply')
router.prefix('/api/v1')

 //创建文章
router.post('/reply',ReplyController.createReply)

 //获取文章列表
router.get('/reply',ReplyController.getReplyListByCommentId)

//更新文章
router.put('/reply/:_id',jwtAuth({secret:'secret'}),ReplyController.updateReplyById)

//获取文章详情
router.get('/reply/:_id',ReplyController.getReplyDetailById)

//删除文章
router.delete('/reply/:_id',jwtAuth({secret:'secret'}),ReplyController.deleteReplyById)

module.exports = router