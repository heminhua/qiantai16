import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Shop from '../components/shop/Shop.vue'
import GoodsList from '../components/shop/goods/List.vue'
import GoodsDetail from '../components/shop/goods/Detail.vue'
import OrderComplete from '../components/shop/order/Complete.vue'
import OrderPay from '../components/shop/order/Pay.vue'
import OrderSite from '../components/shop/order/Site.vue'
import ShopCart from '../components/shop/shopCart/ShopCart.vue'


Vue.use(Router)
//商品路由
let goods=[
  {name:'goodsList',path:'goods/list',component:GoodsList},
  {name:'goodsDetail',path:'goods/detail',component:GoodsDetail},
]
//订单信息路由
let order=[
  {name:'orderComplete',path:'order/complete',component:OrderComplete},
  {name:'orderPay',path:'order/pay',component:OrderPay},
  {name:'orderSite',path:'order/site',component:OrderSite},
]
//购物车路由
let shopCart=[
  {name:'shopCart',path:'shopcart',component:ShopCart}
]

export default new Router({
  routes: [
   {name:'login',path:'/login',component:Login},
   {name:'shop',path:'/',component:Shop,children:[...goods,...order,...shopCart]}
  ]
})
