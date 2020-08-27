const AdminModel = require('../models/AdminModle')
const bcrypt = require('bcrypt')
const {generateToken} = require('../core/util')
const {registerValidator,loginValidator} = require('../validator/admin')
class AdminController{
    static async createAdmin(ctx,next){
         registerValidator(ctx)//注册参数校验
         const {nickname,password} = ctx.request.body
         const adminUser = await AdminModel.findOne({nickname})
         if (adminUser) {
             throw new global.errs.Existing('管理员已存在')
         }
         const admin = await AdminModel.create({
             nickname,
             password:password
         })
         //返回结果
         ctx.status = 200;
         ctx.body = {
             code:200,
             msg:'success',
             errorCode:0,
             admin
         }

    }
    static async login(ctx,next){
        loginValidator(ctx)//登录参数校验
        const {nickname,password} = ctx.request.body
        const adminUser = await AdminModel.findOne({nickname})
        if (!adminUser) {
            throw new global.errs.AuthFailed('账号不存在或密码为空')
        }
        const corret = bcrypt.compareSync(password,adminUser.password)
        if (!corret) {
            throw new global.errs.AuthFailed('账号不存在或密码为空')
        }
        const token = generateToken(adminUser._id)
        ctx.status = 200;
        ctx.body = {
             code:200,
             msg:'登陆成功',
             errorCode:0,
             nickname:adminUser.nickname,
             token
         }
    }
    static async getUser(ctx,next){
        //令牌认证
        const _id = ctx.state.user.data

        const userInfo = await AdminModel.findById({_id})
        if (!userInfo) {
            throw new global.errs.AuthFailed('账号不存在或密码为空')
        }
        ctx.body = {
            code:200,
            ok:1,
            _id:userInfo._id,
            nickname:userInfo.nickname
        }
    }
}
module.exports = AdminController