<template>
    <div>
        <!-- 公共头部 -->
        <app-header></app-header>
        <!-- 主要内容 -->
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <!-- 面包屑导航 结束 -->
        <!-- <app-list></app-list> -->

        <!-- 主要内容 -->
        <router-view></router-view>
        <!-- 公共尾部 -->
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from "../subcom/Header.vue";
import Footer from "../subcom/Footer.vue";
// import List from "../subcom/List.vue";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    // appList:List
  },
  data() {
    return {};
  }
};
</script>


</style>