<template>
  <div class="xlist">
    <div class="wl" v-html="info.info"></div>
    <ul
      class="list-contain"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
    
      <li v-for="(item,index) in list" :key="index">
        <div class="img">
          <img :src="item.imageUrl">
        </div>
        <div class="name">
          <div class="left">
            <img :src="item.imageUrl">
          </div>
          <div class="right">{{item.title}}</div>
        </div>
        <div class="desc">{{item.city}}</div>
        <div class="praise">
          <div class="c">
            <i class="iconfont icon-aixinon"></i>
            <span>{{item.title}}</span>
          </div>
        </div>
      </li>
    </ul>
    
    <!-- <Bottom></Bottom> -->
  </div>
</template>

<script>
import Bottom from "../../commons/Bottom";
import Vue from "vue";
import Axios from "axios";
import { Toast, InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
import { Spinner } from "mint-ui";
Vue.component(Spinner.name, Spinner);
export default {
  name: "FoodCircle",
  components: { Bottom },
  data() {
    return {
      name: "我是foodcircle页面",
      list: [],
      pageNo: 1,
      info:{}
    };
  },
  methods: {
    loadMore() {
      // this.getData();
    },
    getData() {
      // this.toast = Toast({
      //   message: "loading",
      //   iconClass: "fa-spin fa fa-spinner"
      // }); //发起请求
      this.$axios
        .get("/wl/mjfx/view", {
          params: {
            client: "m",
            encrypt: 0,
            id: 4751
          }
        })
        .then(res => {
          console.log(res.info);
          this.info=res.info;
          // this.list = this.list.concat(res.data.data); //%23
          // this.pageNo++;
          // this.toast.close();
        })
        .catch(err => {
          this.toast.close();
          console.log(err);
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
.xlist {
  // .padding(28, 25, 0, 25);
  .wl{
    .lh(22);
    // line-height: 22px;
    width: 100%;
    color: #555;
    word-wrap: break-word;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      .mb(20);
      .w(153);
      box-shadow: 0 0 4px #ededed;
      .img {
        .h(112);
        .mb(10);
        background: skyblue;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        width: 100%;
        .mb(19);
        display: flex;
        justify-content: flex-start;
        .left {
          .h(30);
          .w(30);
          .margin(0, 5, 0, 10);
          border-radius: 50%;
          background: skyblue;
          overflow: hidden;
          position: relative;
          img {
            width: 100%;
            position: absolute;
          }
        }
        .right {
          color: #666;
          .lh(30);
          .fs(14);
        }
      }
      .desc {
        .fs(14);
        .ml(10);
        .h(14);
        .lh(14);
        overflow: hidden;
        color: #333;
      }
      .praise {
        .padding(23, 0, 15, 60);
        .c {
          .fs(0);
          .h(16);
          .lh(16);
          i {
            display: inline-block;
            .mr(6);
            .fs(18);
            color: rgb(231, 31, 31);
          }
          span {
            color: #666;
            .fs(15);
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>