<template>
  <section class="comment">
    <div class="comment-header">评论列表</div>
    <!-- 评论列表 -->
    <ul class="comment-box" v-if="comments && comments.length > 0">
      <li class="comment-item" v-for="item in comments" :key="item._id">
        <div class="comment-avatar">
          <el-avatar src="https://timgsa.baidu.com/timg?image"></el-avatar>
        </div>
        <div class="comment-info">
          <!-- 评论者姓名 -->
          <h1 class="comment-username">{{item.nickname}}</h1>
          <p class="comment-content">{{item.content}}</p>
          <!-- 回复列表 -->
          <div class="comment-reply" v-if="item.replyList && item.replyList.length > 0">
            <ul class="comment-box">
              <li class="comment-item" v-for="reply in item.replyList" :key="reply._id">
                <div class="comment-avatar">
                  <el-avatar src="https://timgsa.baidu.com/timg?image"></el-avatar>
                </div>
                <div class="comment-info">
                  <h1 class="comment-username">来自「{{reply.nickname}}」的回复</h1>
                  <p class="comment-content">{{reply.content}}</p>
                </div>
              </li>
            </ul>
          </div>
          <p class="comment-reply-btn" @click="reply(item._id,item.nickname)">点击回复</p>
        </div>
      </li>
    </ul>
    <!-- 加载更多按钮 -->
    <ul
      class="load-more-comment"
      @click="loadMoreComment"
      v-if="page && page.comment_currentPage < page.comment_total_pages"
    >
      <i class="el-icon-bottom" style="color:#2d8cf0;"></i>
      点击加载更多
    </ul>
    <!-- 回复弹框 -->
    <el-dialog :title="replyNickName" :visible.sync="show">
      <v-comment-create
        @updateReply="updateReply"
        :comment_type="commentType"
        :comment_id="comment_id"
      />
    </el-dialog>
  </section>
</template>
<script>
import VCommentCreate from "./comment-create";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    target_id: {
      type: String //当前文章的id
    },
    target_type: {
      type: String,
      default() {
        return "article";
      }
    }
  },
  components: {
    VCommentCreate
  },
  computed: {
    ...mapState({
      comments: state => state.comment.commentList,
      page: state => state.comment.commentPage
    })
  },
  data() {
    return {
      form: {
        name: "",
        region: ""
      },
      show: false,
      // 评论父级id
      comment_id: "",
      // 回复昵称
      replyNickName: "",
      replyArr: [],
      commentType: "reply",
      currentPage: 1
    };
  },
  methods: {
    ...mapActions({
      getTargetComments: "comment/getTargetComments"
    }),
    async loadMoreComment() {
      // 加载更多评论
      if (
        this.page &&
        this.page.comment_currentPage !== this.page.comment_total_pages
      ) {
        this.currentPage++;
        // 加载评论操作
        // 1.获取该文章目标下的所有评论
        const res = await this.getTargetComments({
          target_id: this.target_id,
          currentPage: this.currentPage
        });
        const { currentPage, total, total_pages, pageSize } = res.data.data;
        console.log(res.data.data);
        // 2.将新评论的数据叠加到原来评论的数据中
        const newCommentList = [...this.comments, ...res.data.data.data];
        console.log(newCommentList);
        // 3.设置新的评论数据展示
        this.$store.commit("comment/SET_COMMENT_LIST", newCommentList);
        // 4.设置新的page
        this.$store.commit("comment/SET_COMMENT_PAGE", {
          comment_currentPage: currentPage,
          comment_total: total,
          comment_total_pages: total_pages,
          comment_pageSize: pageSize
        });
        console.log(this.comments);
      } else {
        this.$message({
          message: "没有更多评论了~~",
          type: "warning"
        });
      }
    },
    // 回复评论
    reply(comment_id, nickname) {
      this.show = true;
      this.comment_id = comment_id;
      this.replyNickName = nickname;
    },
    updateReply(newReply, type) {
      // 更新评论
      this.show = !this.show;
      // 通知detail父组件更新
      this.$emit("updateComment", newReply, type);
    }
  }
};
</script>
<style scoped lang="less">
.comment-header {
  font-size: 28px;
  font-weight: 500;
  color: #2d8cf0;
  padding: 32px 0 16px;
}

.comment-item {
  margin: 16px 0;
  display: flex;
}

.comment-avatar {
  margin-right: 16px;
}

.comment-username {
  color: #17233d;
  font-size: 18px;
  font-weight: 500;
}

.comment-info {
  flex: 1;
}

.comment-content {
  color: #515a6e;
  line-height: 36px;
  font-size: 16px;
}

.comment-reply {
  padding: 12px 24px;
  margin: 24px 0;
  border-radius: 6px;
  background: #f8f8f8;
}

.comment-reply-btn {
  color: #2d8cf0;
  font-size: 16px;
  cursor: pointer;
}

.time {
  font-size: 14px;
  font-weight: bold;
}

.content {
  padding-left: 5px;
}

.load-more-comment {
  text-align: center;
  margin: 32px 0;
  font-size: 18px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>