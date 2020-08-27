const router = require('koa-router')()
const jwtAuth = require('koa-jwt')
const CommentController = require('../controller/comment')
router.prefix('/api/v1')

 //创建文章
router.post('/comment',CommentController.createComment)

 //获取文章列表
router.get('/comment',CommentController.getComment)

//更新文章
router.put('/comment/:_id',jwtAuth({secret:'secret'}),CommentController.updateComment)

//获取文章详情
router.get('/comment/:_id',CommentController.getCommentById)

//删除文章
router.delete('/comment/:_id',jwtAuth({secret:'secret'}),CommentController.deleteComment)

router.get('/comment/target/list',CommentController.getTargetComment)

module.exports = router