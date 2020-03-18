<template>
  <div class="foodcircle">
    <div class="top">
      消息
      <i class="iconfont icon-xiaoxi"></i>
    </div>
    <ul
      class="conter"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li @click="selItem(item._id)" v-for="(item,index) in list" :key="index">
        <div class="tops">{{item.qname}}</div>
        <div class="bottom">
          <div class="left">
            <span>{{item.title}}</span>
            <span></span>
            <span></span>
          </div>
          <div class="right">{{item.date}}</div>
        </div>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
import Footer from "../../commons/Footer";
export default {
  name: "FoodCircle",
  components: {
    Footer
  },
  data() {
    return {
      now: 0,
      nows: 0,
      url: "hot",
      list: []
    };
  },
  methods: {
    selItem(href) {
      this.$router.push({ path: "/msgd", query: { id: href } });
    },
    loadMore() {
      // this.getData();
    },
    getData() {
      // this.toast = Toast({
      //   message: "loading",
      //   iconClass: "fa-spin fa fa-spinner"
      // });
      const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/delivery/finddelivery", {
          xuehao,
          pass: 1
        })
        .then(res => {
          console.log(res.data);
          if (res.msg == "ok") {
            // this.list = this.list.concat(res.data);
            this.list = res.data.reverse();
            // this.pageNo++;
          }
        })
        .catch(err => {

        });
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.foodcircle {
  .padding(43, 0, 700, 0);
  background: rgba(243, 242, 242, 0.938);
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
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #333;
    li {
      .h(60);
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .margin(10, 14, 0, 14);
      .padding(0, 10, 0, 10);
      border-radius: 5px;
      .tops {
        color: black;
        .fs(14);
      }
      .bottom {
        .mt(5);
        width: 100%;
        display: flex;
        color: #999;
        justify-content: space-between;
        align-items: center;
        .fs(12);
      }
    }
  }
}
</style>