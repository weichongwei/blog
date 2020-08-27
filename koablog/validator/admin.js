function registerValidator(ctx) {
    ctx.validateBody('nickname')
      .required('用户名是必须的')
      .isString()
      .trim()
      .isLength(3, 15, '用户名必须是3~15位');
    ctx.validateBody('password')
      .required('密码是必填项')
      .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码长度必须在6~22位之间，包含字符、数字和 _ ')
    ctx.validateBody('password2')
      .required('确认密码是必填项')
      .eq(ctx.vals.password, '两次密码不一致')
    // error instanceof bouncer.Validatorerror
  }
  function loginValidator(ctx) {
    ctx.status = 201
    ctx.validateBody('password')
      .required('密码是必须的')
      .trim()
      .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码长度必须在6~22位之间，包含字符、数字和 _ ')
  }
  module.exports = {
    registerValidator,
    loginValidator
  }