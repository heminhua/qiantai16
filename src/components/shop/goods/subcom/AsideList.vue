<template>
    <div>
        <!--推荐商品-->
        <div class="left-220">
            <ul class="side-img-list">

                <li v-for="(item, i) in list" :key="item.id">
                    <div class="img-box">
                        <label>{{i+1}}</label>
                        <img :src="item.img_url">
                    </div>
                    <div class="txt-box">
                         <router-link :to="{name: 'goodsDetail', params: {id: item.id}}">{{ item.title }}</router-link>
                        <span>{{item.add_time | date}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!--/推荐商品-->
    </div>
</template>

<script>
export default {
    //接收父传过来的数据
  props: ["list"],
  //局部过滤器
  filters:{
      //日期过滤器
      date(val){
          let date=new Date(val);
          return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      }
  },

};
</script>

<style scoped>

</style>