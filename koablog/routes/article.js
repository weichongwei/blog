const router = require('koa-router')()
const jwtAuth = require('koa-jwt')
const ArticleController = require('../controller/article')
const upload = require('../middlewares/upload')
router.prefix('/api/v1')

 //创建文章
router.post('/article',jwtAuth({secret:'secret'}),ArticleController.createArticle)

 //获取文章列表
router.get('/article',ArticleController.getArticle)

//更新文章
router.put('/article/:_id',jwtAuth({secret:'secret'}),ArticleController.updateArticle)

//获取文章详情
router.get('/article/:_id',jwtAuth({secret:'secret'}),ArticleController.getArticleById)

//删除文章
router.delete('/article/:_id',jwtAuth({secret:'secret'}),ArticleController.deleteArticle)

//上传封面
router.post('/upload', upload.single('avatar'),ArticleController.uploadCoverImg)

module.exports = router