const { categoryValidator } = require('../validator/category')
const CategoryModle = require('../models/CategoryModle')
class categoryController {
    //创建分类
    static async createCategory(ctx, next) {
        //参数验证
        categoryValidator(ctx)
        const { name, keyword } = ctx.request.body
        const hasCategory = await CategoryModle.findOne({ name })
        if (hasCategory) {
            throw new global.errs.Existing('分类已存在')
        }
        const category = await CategoryModle.create({ name, keyword })
        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: '创建分类成功',
            errorCode: 0,
            category
        }
    }
    //获取分类
    static async getCategory(ctx, next) {
        const categoryList = await CategoryModle.find()
        ctx.body = {
            code: 200,
            msg: '获取分类成功',
            errorCode: 0,
            categoryList
        }
    }
    //更新分类
    static async updateCategory(ctx, next) {
        categoryValidator(ctx)
        const _id = ctx.params._id
        const { name, keyword } = ctx.request.body
        if (keyword) {
            console.log("我为空");
        }
        const category = await CategoryModle.findByIdAndUpdate({ _id }, { name, keyword })
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类')
        }
        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: '更新分类成功',
            errorCode: 0,
        }
    }
    //获取分类详情
    static async getCategoryById(ctx, next) {
        const _id = ctx.params._id
        const category = await CategoryModle.findById({ _id })
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类')
        }
        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: '获取分类详情成功',
            errorCode: 0,
            category
        }
    }
    //删除分类
    static async deleteCategory(ctx, next) {
        const _id = ctx.params._id
        const category = await CategoryModle.findByIdAndDelete({ _id })
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类')
        }
        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: '删除分类成功',
            errorCode: 0,
        }
    }
}
module.exports = categoryController