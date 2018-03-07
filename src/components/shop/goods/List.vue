<template>
    <div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="item in top.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subItem in item.subcates" :key="subItem.id">{{subItem.title}}&nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="subItem in item.subcates" :key="subItem.id">{{subItem.title}}&nbsp;</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel style="height: 100%">
                                <el-carousel-item v-for="item in top.sliderlist" :key="item.id">
                                    <img :src="item.img_url" :alt="item.title">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <!-- <app-aside-list :list="top.toplist"></app-aside-list> -->
                </div>
                <app-aside-list :list="top.toplist"></app-aside-list>
            </div>
            <!-- /top -->

        </div>

        <div class="section" v-for="(item,i) in goodsGroup" :key="i">
            <!--子类-->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>

                    <a href="/goods/43.html" v-for="subItem in item.level2catelist" :key="subItem.subcateid">{{subItem.subcatetitle}}</a>

                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">

                        <li v-for="(datasItem,i) in item.datas" :key="i">
                            <router-link :to="{name:'goodsDetail',params:{id:datasItem.artID}}">
                                 <div class="img-box">
                                    <img :src="datasItem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{datasItem.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{datasItem.market_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{datasItem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{datasItem.sell_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AsideList from "./subcom/AsideList.vue";
export default {
  components: {
    appAsideList: AsideList
  },
  data() {
    return {
      top: {
        catelist: [],
        sliderlist: [],
        toplist: []
      },
      goodsGroup:[]
    };
  },
  methods: {
      //获取顶部数据
    getTop() {
      this.$http.get(this.$api.goodsTop).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.top = res.data.message;
          //   console.log(this.top);
        }
      });
    },
    //获取商品分类
    getgoodsGroup(){
        this.$http.get(this.$api.goodsContent).then(res=>{
            // console.log(res);
            if(res.data.status==0){
                // console.log(1);
                this.goodsGroup=res.data.message
                // console.log(this.goodsGroup);
                // console.log(this.goodsGroup.datas);
            }
        })
    }
  },
  created() {
    this.getTop();
    this.getgoodsGroup();
  }
};
</script>

<style scoped>

</style>