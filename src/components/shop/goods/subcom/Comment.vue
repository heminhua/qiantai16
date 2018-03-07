<template>
    <div>
        <div class="comment-box">
            <!--取得评论总数-->
            <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98" @submit.prevent="sendComment">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="conn-box">
                    <div class="editor">
                        <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model="content.commenttxt"></textarea>
                        <span class="Validform_checktip"></span>
                    </div>
                    <div class="subcon">
                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                    </div>
                </div>
            </form>
            <ul id="commentList" class="list-box">
                <!--  -->
                <p v-if="commentlist.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                <li v-for="(item,i) in commentlist" :key="i">
                    <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="inner-box">
                        <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time | date }}</span>
                        </div>
                        <p>{{ item.content }}</p>
                    </div>
                </li>

            </ul>

        </div>

    </div>
</template>

<script>
export default {
  props: ["id"],
    //局部过滤器
  filters:{
      //日期过滤器
      date(val){
          let date=new Date(val);
          return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      }
  },
  data() {
    return {
      commentlist: [],
      content: {
        commenttxt: ""
      }
    };
  },
  methods: {
    getComment() {
      let api = `${this.$api.commentList}goods/${
        this.id
      }?pageIndex=1&pageSize=10`;
      this.$http.get(api).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.commentlist = res.data.message;
        //   console.log(this.commentlist);
        }
      });
    },
    sendComment() {
      let api = `${this.$api.comment}goods/${this.id}`;
      this.$http.post(api, this.content).then(res => {
        // console.log(res);
        // console.log(this.content.commenttxt);
        this.content.commenttxt='';
        this.getComment();
      });
    }
  },
  created() {
    this.getComment();
  },
  //当用户访问新的商品时，需要重新调接口获取新商品的评论列表进行渲染
  watch: {
    id() {
      this.getComment();
    }
  }
};
</script>

<style scoped>

</style>