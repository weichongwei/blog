<template>
  <section class="author">
    <article class="item">
      <h1 class="logo">
        <img src="../assets/images/logo.png" alt="LOGO" />
      </h1>
    </article>
    <article class="text">
      <p>基于 Node.js Koa2 实战开发的一套完整的博客项目网站，使用 Koa2 二次开发一套适合多端的 RESTful API，同时配套完整的后台管理系统，且前端展示既有基于 ejs 服务端渲染，也有基于 Vue.js 前后端分离的 2 套前端网站</p>
      <p class="content">博客的内容：积极向上的文章。</p>
      <p>博客的愿景：和更多的朋友一起学习进步。</p>
      <p>博客的风格：简约至上。</p>
    </article>
    <article class="end">
      <p>最后，祝大家每天开心，每天幸福！</p>
    </article>
  </section>
</template>

<style scoped lang="less">
@import '../assets/css/common.less';
.author {
  box-sizing: border-box;
  width: @window-Width;
  min-height: 80vh;
  margin: 24px auto;
  overflow: hidden;
  padding-bottom: 24px;
  background-color: #fff;
  border-radius: 6px;
}

.item {
  width: 100%;
  padding: 48px 0;
  text-align: center;
  background: white;
}

.logo {
  width: 320px;
  margin: 32px auto 0;

  & img {
    width: 100%;
  }
}

a {
  color: #409eff;
}

.text {
  padding: 0 32px 32px;
  line-height: 42px;
  font-size: 20px;
  color: #666;
  text-indent: 2em;
}

.content {
  padding-top: 32px;
}

.end {
  line-height: 42px;
  font-size: 20px;
  color: #666;
  text-indent: 2em;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .author {
    width: 100%;
  }
}
</style>
