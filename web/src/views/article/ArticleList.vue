<template>
  <section class="articles">
    <article class="article-list">
      <!-- 文章分类显示 -->
      <ul class="category" v-if="categoryList && categoryList.length > 0">
        <!-- <li>{{count}}</li> -->
        <li
          class="category-item"
          v-for="(item,i) in categoryList"
          :key="item.id"
          :class="{'category-item-active' : categoryIndex == i }"
          @click="changeCategory(item._id,i)"
        >{{item.name}}</li>
      </ul>
      <!-- 文章组件-->
      <article-item :list="list" />

      <div class="page">
        分页组件
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.pageIndex"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total"
        ></el-pagination>
      </div>
    </article>

    <!-- 侧边栏 -->
    <main-sidebar />
  </section>
</template>

<script>
import ArticleItem from "../../components/ArticleItem";
import MainSidebar from "../../components/main-sidebar";

import { mapActions, mapState } from "vuex";
export default {
  components: {
    ArticleItem,
    MainSidebar
  },
  name: "list",
  data() {
    return {
      list: [],
      page: {},
      currentPage: 1
      //categoryIndex: 0
    };
  },
  created() {
    this.getCategoryList();
    this.getArticle();
  },
  watch: {
    $route() {
      this.getArticle();
    }
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/list",
      getArticleList: "article/list"
    }),
    changeCategory(id, i) {
      this.$store.commit('category/SET_CATEGORY_INDEX',i);
      localStorage.setItem('categoryIndex',i);
      this.$router.push({
        query:{
          category_id:id
        }
      })
      // this.getArticle();
    },
    async getArticle() {
      const params = {
        pageIndex: this.currentPage,
        pageSize: 2,
        category_id: this.$route.query.category_id,
        keyword: this.$route.query.keyword
      };
      let res = await this.getArticleList(params);
      const { articleList, pageIndex, total, pageSize } = res;
      this.list = articleList;
      this.page = { total, pageSize, pageIndex };
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getArticle();
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.category.categoryList,
      categoryIndex:state => state.category.categoryIndex
    })
  }
};
</script>

<style scoped lang="less">
.category {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  height: 64px;
  line-height: 64px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.category-item {
  margin-left: 32px;
  cursor: pointer;
  color: #515a6e;
  font-size: 16px;
  font-weight: normal;

  &:hover {
    color: #2d8cf0;
  }
}

.category-item-active {
  color: #2d8cf0;
}

.articles {
  width: 70%;
  display: flex;
  min-height: 80vh;
  margin: 24px auto;
}

.article-list {
  flex: 1;
  margin-right: 32px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .articles {
    width: 100%;
  }

  .article-list {
    margin-right: 0;
  }
}
</style>