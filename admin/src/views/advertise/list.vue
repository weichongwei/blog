<template>
  <section>
    <Button type="primary" @click="toPathLink('/advertise/create')" icon="md-add" style="margin-bottom: 16px;">新增广告
    </Button>

    <section v-if="advertiseList.length > 0">
      <Table border :columns="columns" :data="advertiseList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row._id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>
    </section>

  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        advertiseList: [
          {
            _id:1,
            title:'百度一下',
            link:'http://www.baidu.com'
          }
        ],
        page: null,
        columns: [
          // {
          //   title: 'ID',
          //   key: 'id',
          //   width: 80,
          //   align: "center"
          // },
          {
            title: '广告名称',
            key: 'title'
          },
          {
            title: '广告链接',
            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: params.row.link,
                  target: '_blank'
                },
                style: {
                  color: '#2d8cf0'
                },
              }, params.row.link);
            }
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
    },
    methods: {
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 更新
      update(id) {
        this.$router.push(`/advertise/update/${id}`);
      },
      // 删除广告
      destroy(id) {
        console.log('删除广告',id);
      }
    }
  }
</script>

<style scoped>

</style>