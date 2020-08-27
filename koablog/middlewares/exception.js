const { HttpExeption } = require('../core/http-exception')
const bouncer = require('koa-bouncer');
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error);
        // 参数错误
        if (error instanceof bouncer.ValidationError) {
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                name: error.name,
                msg: error.message,
            }
            return;
        }
        // 权限错误 401 jwt
        if (error.status === 401) {
            ctx.status = 401;
            // ctx.body = res.
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                errorCode: error.status,
                msg: '请求头中需要令牌token,请检查token'
            }
            return;
        }
        const istrue = error instanceof HttpExeption
        if (istrue) {
            ctx.status = error.code
            ctx.body = {
                request: `${ctx.method}${ctx.path}`,
                msg: error.msg,
                errorCode: error.errorCode
            }
        } else {
            ctx.status = 500
            ctx.body = {
                request: `${ctx.method}${ctx.path}`,
                msg: '未知错误',
                errorCode: 9999
            }
        }
    }
}
module.exports = catchError