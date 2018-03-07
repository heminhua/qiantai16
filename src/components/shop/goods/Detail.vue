<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in detail.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{detail.goodsinfo.title}}</h1>
                                <p class="subtitle">{{detail.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{detail.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{detail.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{detail.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 数量 -->
                                                <el-input-number v-model="num" size="mini" :min="1" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{detail.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <!-- element-ui-tabs -->
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="商品介绍" name="first">
                                <div v-html="detail.goodsinfo.content"></div>
                            </el-tab-pane>
                            <el-tab-pane label="商品评论" name="second">
                                <!--网友评论-->
                                <app-comment :id="id"></app-comment>
                                <!--/网友评论-->
                            </el-tab-pane>
                        </el-tabs>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <app-aside-list :list="detail.hotgoodslist"></app-aside-list>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AsideList from "./subcom/AsideList.vue";
import Comment from "./subcom/Comment.vue";
//导入放大镜插件
import "@/lib/imgzoom/css/magnifier.css";
import "@/lib/imgzoom/js/magnifier.js";
import $ from "jquery";
export default {
  components: {
    appAsideList: AsideList,
    appComment: Comment
  },
  props: ["list"],
  data() {
    return {
      num: 1,
      id: this.$route.params.id,
      activeName: "second",
      detail: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //获取商品数据接口
    getGoodsDetail() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.detail = res.data.message;
          // console.log(this.detail);
          // console.log(this.detail.goodsinfo.title);
        }
        // console.log(this.id);
      });
    }
  },

  created() {
    this.getGoodsDetail();
  },
  //商品详情页面右侧列表，可以点击切换不同的商品进行预览
  //但是默认情况下页面切换到当前页面不会触发组件的重新渲染，为了解决这个问题，我们可以监听$route对象的变化，因为切换商品后，$route.params.id变化了，我们监听它，然后主动发起http请求,调用接口获取 新id 的数据进行视图刷新
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getGoodsDetail();
    },
    detail() {
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 5 //缩放比例
      };

      // 调用这个插件的方法, 必须保证放大镜相关的DOM节点都已经正常构建并渲染,
      // 但是我们的节点里面有个v-for动态生成列表, 调用该方法时不能保证列表已经构建完毕, 所以延时一下
      setTimeout(function() {
        var _magnifier = $().imgzoon(magnifierConfig);
      }, 500);
    }
  },
  // 视图挂载到页面上了, 这里可操作DOM
  mounted() {}
};
</script>

<style scoped>

</style>