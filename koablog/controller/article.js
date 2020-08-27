const { articleValidator } = require('../validator/article')
const ArticleModle = require('../models/ArticleModel')
const Comment = require('./comment')
const ReplyModle = require('../models/ReplyModle')
const { Resolve } = require('../config/help')
const comment = require('../validator/comment')
const res = new Resolve();
class ArticleController {
    //创建文章
    static async createArticle(ctx, next) {
        articleValidator(ctx)
        const { title } = ctx.request.body
        const hasarticle = await ArticleModle.findOne({ title })
        if (hasarticle) {
            throw new global.errs.Existing('文章已存在')
        }
        await ArticleModle.create(ctx.request.body)
        ctx.status = 200
        ctx.body = res.success('创建文章成功');
    }
    //获取文章列表
    static async getArticle(ctx, next) {
        console.log('wolaile');
        let { category_id = null, pageIndex = 1, pageSize = 4, keyword } = ctx.query
        let filter = {}
        if (category_id) {
            filter.category_id = category_id
            const article = await ArticleModle.findOne({ category_id })
            if (!article) {
                throw new global.errs.NotFound('文章不存在')
            }
        }
        const total = await ArticleModle.find().count()

        pageIndex = parseInt(pageIndex)
        pageSize = parseInt(pageSize)
        const articleList = await ArticleModle.find()
            .where(filter)
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .or([{
                keyword: {
                    $regex: new RegExp(keyword, 'i')
                }
            }])
            .sort({ _id: -1 })//倒序
            .populate('category_id')//连表查询
        const data = {
            articleList,
            pageIndex,
            pageSize,
            total
        }
        ctx.body = res.json(data);
    }
    //更新文章
    static async updateArticle(ctx, next) {
        const _id = ctx.params._id
        let article = await ArticleModle.findByIdAndUpdate({ _id }, ctx.request.body)
        if (!article) {
            throw new global.errs.NotFound('文章不存在')
        }
        ctx.status = 200
        ctx.body = res.success('更新文章成功');
    }
    //获取文章详情
    static async getArticleById(ctx, next) {
        const _id = ctx.params._id
        let article = await ArticleModle.findOne({ _id }).populate('category_id')
        if (!article) {
            throw new global.errs.NotFound('文章不存在')
        }

        //获取文章下评论列表
        //const commentList = await CommentModle.find({ target_id: article._id }).sort({ id: -1 }).lean()
        let comment = await Comment.targetComment({
            target_id: article._id
          });
        await ArticleModle.findByIdAndUpdate({
            _id
          }, {
            browse: ++article.browse
          })
        let data = {
            article,
            commentList: comment.data,
            comment_currentPage: comment.currentPage,
            comment_pageSize: comment.pageSize,
            comment_total: comment.total,
            // 总页数
            comment_total_pages: comment.total_pages
          }
          ctx.status = 200;
          ctx.body = res.json(data);
    }
    //删除文章
    static async deleteArticle(ctx, next) {
        const _id = ctx.params._id
        const dlelteres = await ArticleModle.findOneAndDelete({ _id })
        if (!dlelteres) {
            throw new global.errs.NotFound('文章不存在')
        }
        ctx.body = {
            code: 200,
            msg: "删除成功",
            errorCode: 0,
        }
    }
    //图片上传
    static async uploadCoverImg(ctx,next){
        ctx.body = res.json(ctx.req.file.filename)
    }
}
module.exports = ArticleController
