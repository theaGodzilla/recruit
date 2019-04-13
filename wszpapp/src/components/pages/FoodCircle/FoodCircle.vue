<template>
	<div class="foodcircle">
		<div class="top">
			美食圈
			<i class="iconfont icon-xiaoxi"></i>
		</div>
		<ul class="conter">
			<li @click="selItem(index,item.path)" v-for="(item,index) in con" :key="index">
				{{item.name}}
				<i :class="index==now?'iconfont icon-icon-solidArrow-up':''"></i>
			</li>
		</ul>
		<ul class="cont">
			<li @click="selClass(index,item.url)" v-for="(item,index) in cont" :key="index" :class="index==nows?'hl':''" >
        {{item.name}}
				<i :class="index==nows?'iconfont icon-icon-solidArrow-right':''"></i>
			</li>
		</ul>
    <router-view :urls="this.url" ref="list"></router-view>
		<!-- <router-view/> -->
    <Footer></Footer>
	</div>
</template>

<script>
import Tzlist from "./Tzlist";
import Xlist from "./Xlist";
import Footer from '../../commons/Footer';
export default {
  name: "FoodCircle",
  components: {
    Xlist,Tzlist,Footer
  },
  data() {
    return {
      con: [{name:"帖子", path:'/foodcircle/tzlist'},{name:"秀美食",path:'/foodcircle/xlist'}],
      cont: [{name:"热门",url:'hot'}, {name:"最新",url:'new'}, {name:"关注",url:'follow'}],
      now:0,
      nows:0,
      url:'hot'
    };
  },
  methods:{
    selItem(index,path){
      this.nows=0;
      this.now=index;
      this.$router.push(path)
      // if(index==0){
      //   // this.$router.push({path:'/foodcircle/tzlist',query:{url:'hot'}});
      //   this.$router.push();
      //   this.url='hot'
      // }else{
      //   this.$router.push();
      // }
      
    },
//     checkRouterLocal(path) {
//  // 查找当前路由下标高亮
//  this.now = this.con.findIndex(item => item.path === path);
// },

    selClass(index,url){
      this.nows=index;
      this.url=url;
      this.$refs.list.$emit('tzlist',url)
      
      // 
      // this.$router.push({
      //   path:'/foodcircle/tzlist',
      //   query:{
      //     url:url
      //   }
      // })
    }
  },
//   watch: {
//  "$route"() {
//  // 获取当前路径
//  let path = this.$route.path;
//  // 检索当前路径
//  this.checkRouterLocal(path);
//  }
// },

  created(){
    this.$router.push('/foodcircle/tzlist')
    // {
    //     name:'Tzlist',
    //     query:{
    //       url:'hot'
    //     }
    //   }
    
  }
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.foodcircle {
  .padding(43, 0, 49, 0);
  .top {
    width: 100%;
    text-align: center;
    .h(43);
    .lh(43);
    border-bottom: 1px solid #ededed;
    position: fixed;
    .top(0);
    .left(0);
    background: #fff;
    z-index: 10;
    .fs(18);
    color: #333;
    // position: relative;
    i {
      display: block;
      /*font-weight: 600;*/
      .fs(26);
      position: absolute;
      .top(1);
      .right(8);
    }
  }
  .conter {
    width: 100%;
    .fs(16);
    display: flex;
    text-align: center;
    color: #333;
    background: #fff;
    li {
      .h(50);
    .lh(50);
      width: 50%;
      position: relative;
      i {
        color: #e7693f;
        .fs(18);
        position: absolute;
        .bottom(-22);
        .left(85);
      }
    }
  }
  .cont {
    .h(38);
    .lh(38);
    .fs(15);
    color: #333;
    display: flex;
    text-align: center;
    background: #e7693f;
    .hl {
      color: #fff;
    }
    li {
      width: 33%;
      position: relative;
      i {
        color: #e7693f;
        .fs(18);
        position: absolute;
        .bottom(-20);
        .left(52);
      }
    }
  }
}
</style>