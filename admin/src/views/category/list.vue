<template>
  <section>
    <Button
      type="primary"
      @click="toPathLink('/category/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
    >新增分类</Button>

    <section v-if="list && list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{row}" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{row}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row._id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>
    </section>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      list: [],
      page: null,
      columns: [
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "分类关键字",
          key: "keyword"
        },
        {
          title: "分类下的文章数",
          key: "article_nums"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },
  created() {   
    this.getList()
  },
  watch: {
    $route(to, from) {
      this.getList();
    }
  },
  methods: {
    // 更新
    ...mapActions({
      getCategoryList: "category/getCategoryList",
      destroyCategory:'category/destroyCategory'
    }),
    async getList(){
      let res = await this.getCategoryList();
      this.list = res.data.categoryList;
    },
    update(id) {
      this.$router.push(`/category/update/${id}`);
      console.log("更新分类", id);
    },
    destroy(id) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p>确定要删除分类吗？</p>`,
        loading: true,
        onOk: async () => {
          try {
            await this.destroyCategory({ id });
            this.$Message.success("删除成功");
            this.getList();
          } catch (error) {
            this.$Message.error('删除失败');
          }finally{
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          this.$Message.warning("取消了~");
        }
      });
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
</style>