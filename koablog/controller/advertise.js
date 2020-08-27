const AdvertiseModle = require('../models/AdvertiseModle')
const { advertiseValidator } = require('../validator/advertise')
const { Resolve } = require('../config/help');
const res = new Resolve();

class AdvertiseController{
    // 创建广告
  static async createAdvertise(ctx,next){
    // 参数校验
    advertiseValidator(ctx);
    const {title} = ctx.request.body;
    const advertise = await AdvertiseModle.findOne({title}).lean();
    if(advertise){
      throw new global.errs.Existing('广告标题已存在')
    }
    await AdvertiseModle.create(ctx.request.body);
    ctx.body = res.success('创建广告成功');
  }
  // 获取广告列表
  static async getAdvertiseList(ctx,next){
    const advertiseList = await AdvertiseModle.find().sort({
      _id: 1
    }).lean();
    ctx.status = 200;
    ctx.body = res.json(advertiseList)
  }
  // 获取广告详情
  static async getAdvertiseDetailById(ctx,next){
    const _id = ctx.params._id;
    // await AdvertiseModel.findById({_id})得到的结果是mongoose query对象 调用lean()将query对象转换js对象
    const advertiseDetail = await AdvertiseModle.findById({_id}).lean();
    if (!advertiseDetail){
      throw new global.errs.NotFound('此广告不存在');
    }
    ctx.status = 200;
    ctx.body = res.json(advertiseDetail);
  }
  // 更新广告
  static async updateAdvertiseById(ctx, next) {
    const _id = ctx.params._id;
    // await AdvertiseModel.findById({_id})得到的结果是mongoose query对象 调用lean()将query对象转换js对象
    const advertise = await AdvertiseModle.findByIdAndUpdate({
      _id
    },ctx.request.body).lean();
    if (!advertise) {
      throw new global.errs.NotFound('此广告不存在');
    }
    ctx.status = 200;
    ctx.body = res.success('更新广告成功')
  }
  // 删除广告
   static async deleteAdvertiseById(ctx, next) {
     const _id = ctx.params._id;
     // await AdvertiseModel.findById({_id})得到的结果是mongoose query对象 调用lean()将query对象转换js对象
     const advertise = await AdvertiseModle.findByIdAndDelete({
       _id
     }).lean();
     if (!advertise) {
       throw new global.errs.NotFound('此广告不存在');
     }
     ctx.status = 200;
     ctx.body = res.success('删除广告成功')
   }
}
module.exports = AdvertiseController