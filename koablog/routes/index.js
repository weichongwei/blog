const router = require('koa-router')()
const ArticleModel = require('../models/ArticleModel');
const AdvertiseModel = require('../models/AdvertiseModle');
const CategoryModel = require('../models/CategoryModle');
const CommentModel = require('../models/CommentModle');
const ReplyModel = require('../models/ReplyModle');
router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '魏崇伟博客'
  };
  // 获取参数
  let {
    category_id = null, currentPage = 1, pageSize = 4, keyword
  } = ctx.query;
  // 是否存在分类id
  let filter = {};
  if (category_id) {
    filter.category_id = category_id;
    const article = await ArticleModel.findOne({
      category_id
    });
    if (!article) {
      throw new global.errs.NotFound('该分类下的文章不存在')
    }
  }
  // 转整型
  currentPage = parseInt(currentPage);
  pageSize = parseInt(pageSize);

  // 获取总数量  
  const total = await ArticleModel.find().countDocuments();
  // 查询所有文章
  const article = await ArticleModel.find()
    .where(filter) //条件
    .skip((currentPage - 1) * pageSize) //跳过
    .limit(pageSize) //限制
    .or([ //模糊查询
      {
        // keyword 在数据库中存储的关键
        keyword: {
          $regex: new RegExp(keyword, 'i')
        }
      }
    ])
    .sort({
      _id: -1
    }) //倒序
    .populate('category_id').lean(); //连表查询

  // 获取广告
  const advertise = await AdvertiseModel.find().sort({
    _id: -1
  }).lean();
  const category = await CategoryModel.find().lean();

  const data = {
    title: '魏崇伟博客',
    article,
    currentPage,
    pageSize,
    total,
    advertise,
    category
  }
  await ctx.render('index', data);
})
router.get('/about', async ctx => {
  ctx.status = 200;
  ctx.response.set('Content-Type', 'text/html', 'charset=utf-8');
  await ctx.render("about");
})
// 文章详情接口
router.get('/article/detail/:id',async ctx=>{
  // 获取当前文章的id
  const _id = ctx.params.id;
  // 获取文章详情
  const article = await ArticleModel.findById({_id}).populate('category_id').lean();
  const commentList = await CommentModel.find({
    target_id: article._id
  }).lean()

  // replyList
  let replyList = [];
  for(let i = 0; i < commentList.length; i++){
    replyList = await ReplyModel.find({
      comment_id: commentList[i]._id
    }).lean();
  }
  await ctx.render('article-detail',{
    article,
    commentList,
    replyList
  })
})

module.exports = router
