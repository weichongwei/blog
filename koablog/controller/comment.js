const CommentModle = require('../models/CommentModle')
const ReplyModel = require('../models/ReplyModle')
const { commentValidator } = require('../validator/comment')
const { Resolve } = require('../config/help')
const res = new Resolve();
class CommentController {
  //创建评论
  static async createComment(ctx, next) {
    commentValidator(ctx);
    let newComment = await CommentModle.create(ctx.request.body);
    ctx.body = res.json(newComment);
  }
  //获取评论列表
  static async getComment(ctx, next) {
    const {
      currentPage = 1, pageSize = 4
    } = ctx.query;
    // 获取总数
    const total = await CommentModle.find().count();
    const commentList = await CommentModle.find()
      .skip((parseInt(currentPage - 1) * parseInt(pageSize)))
      .limit(parseInt(pageSize))
      .sort({
        '_id': -1
      })
    ctx.status = 200;
    const data = {
      commentList,
      total,
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize)
    }
    ctx.body = res.json(data);
  }
  //更新评论
  static async updateComment(ctx, next) {
    const _id = ctx.params._id;
    const comment = await CommentModle.findByIdAndUpdate(_id, ctx.request.body);
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论')
    }
    ctx.status = 200;
    ctx.body = res.success('更新评论成功')
  }
  //获取评论详情
  static async getCommentById(ctx, next) {
    const _id = ctx.params._id;
    const commentDetail = await CommentModle.findById({
      _id
    });
    if (!commentDetail) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    // todo: 获取该评论的回复列表 ？？？
    const replyList = await ReplyModel.find({
      comment_id: commentDetail._id
    }).lean();

    ctx.status = 200;
    ctx.body = res.json({
      commentDetail,
      replyList
    });
  }
  //删除评论
  static async deleteComment(ctx, next) {
    const _id = ctx.params._id;
    const comment = await CommentModle.findByIdAndDelete({ _id });
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论')
    }
    ctx.status = 200;
    ctx.body = res.success('删除评论成功')
  }

  static async getTargetComment(ctx, next) {
    console.log(ctx.query);
    const commentList = await CommentController.targetComment(ctx.query);
    ctx.status = 200;
    ctx.body = res.json(commentList)

  }

  // 获取目标评论
  static async targetComment(params = {}) {

    const {
      target_id,
      currentPage = 1
    } = params;
    const pageSize = 4;
    const total = await CommentModle.find({
      target_id
    }).countDocuments();
    // 获取所有的评论
    const commentList = await CommentModle.find({
      target_id
    })
      .skip((parseInt(currentPage - 1) * parseInt(pageSize)))
      .limit(parseInt(pageSize))
      .sort({
        '_id': -1
      }).lean();
    //  2.获取评论下回复列表
    // Promise.all()
    let newCommentList = await Promise.all(commentList.map(async comment => {
      let replyList = await ReplyModel.find({
        comment_id: comment._id
      })
      comment.replyList = replyList;
      return comment;
    }))

    return {
      data: newCommentList,
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: total,
      // 总页数
      total_pages: Math.ceil(total / pageSize)
    }
  }
}
module.exports = CommentController