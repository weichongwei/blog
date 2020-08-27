class HttpExeption extends Error{
    constructor(msg = '服务器异常',errorCode = 10000,code = 400){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}
//用户已存在错误处理
class Existing extends HttpExeption{
    constructor(msg,errorCode){
        super()
        this.code = 412
        this.msg = msg || '已存在'
        this.errorCode = errorCode || 10006
    }
}
class NotFound extends HttpExeption{
    constructor(msg = '路径不存在',errorCode = '10007'){
        super()
        this.code = 404
        this.msg = msg 
        this.errorCode = errorCode 
    }
}
class AuthFailed extends HttpExeption{
    constructor(msg = '授权失败',errorCode = '10008'){
        super()
        this.code = 401
        this.msg = msg 
        this.errorCode = errorCode 
    }
}
class Forbiden extends HttpExeption{
    constructor(msg = '禁止访问',errorCode = '10007'){
        super()
        this.code = 405
        this.msg = msg 
        this.errorCode = errorCode 
    }
}
module.exports = {
    HttpExeption,
    Existing,
    AuthFailed,
    Forbiden,
    NotFound
}