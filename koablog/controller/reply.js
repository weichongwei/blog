const ReplyModle = require('../models/ReplyModle')
const CommentModle = require('../models/CommentModle')
const { replyValidator } = require('../validator/reply')
const { Resolve } = require('../config/help');
const res = new Resolve();

class ReplyController {
    static async createReply(ctx, next) {
        replyValidator(ctx);
        const { comment_id } = ctx.request.body;
        const comment = await CommentModle.findById({
            _id: comment_id
        })
        if (!comment) {
            throw new global.errs.NotFound('没有找到相关评论')
        }
        const reply = await ReplyModle.create(ctx.request.body);
        ctx.body = res.json(reply);
    }
    static async getReplyListByCommentId(ctx, next) {
        // 当前回复列表对应的评论id
        const { comment_id } = ctx.query;
        console.log(comment_id);
        const replyList = await ReplyModle.find({ comment_id }).sort({ _id: -1 });
        // if (!replyList.length) {
        //     throw new global.errs.NotFound('找不到该评论下的回复列表,请检查comment_id参数')
        // }
        ctx.status = 200;
        ctx.body = res.json(replyList);
    }
    static async updateReplyById(ctx, next) {
        const _id = ctx.params._id;
        const reply = await ReplyModle.findByIdAndUpdate(_id, ctx.request.body);
        if (!reply) {
            throw new global.errs.NotFound('找不到相关的回复信息');
        }
        ctx.status = 200;
        ctx.body = res.success('更新回复内容成功')
    }
    static async getReplyDetailById(ctx, next) {
        const _id = ctx.params._id;
        const replyDetail = await ReplyModle.findById({ _id });
        if (!replyDetail) {
            throw new global.errs.NotFound('没有找到相关评论的回复详情信息')
        }
        ctx.status = 200;
        ctx.body = res.json(replyDetail);
    }
    // 删除回复
    static async deleteReplyById(ctx, next) {
        const _id = ctx.params._id;
        const reply = await ReplyModle.findByIdAndDelete(_id);
        if (!reply) {
            throw new global.errs.NotFound('找不到相关的回复信息');
        }
        ctx.status = 200;
        ctx.body = res.success('删除当前回复成功')
    }

}
module.exports = ReplyController