<template>
  <div class="foodbook clearfix">
    <ul class="conlist">
      <li>
        求职攻略
      </li>
    </ul>
    <ul
      class="foodlist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <router-link
        tag="li"
        :to="{path:'detailstart',query:{id:item.id}}"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="title">
          <div class="name">{{item.title}}</div>
          <div class="desc confs">{{item.infoLite.slice(0,51)}}...</div>
          <div class="user confs">
            {{item.year}} {{item.companys[0].name}}
            <span><i class="fa fa-eye" aria-hidden="true"></i> {{item.count}}</span>
          </div>
          <!-- <div class="look confs">
            <i class="iconfont icon-liulan"></i>
            {{item.bookPageViews==null?0:item.bookPageViews}}
          </div>-->
        </div>
        <div class="img">
          <img :src="item.image" alt>
        </div>
      </router-link>
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
  name: "FoodBook",
  components: {
    Footer
  },
  data() {
    return {
      list: [],
      now: 0,
      nows: 0,
      category: "vegetable"
    };
  },
  methods: {
    loadMore() {},
    selCla(idx, id) {
      this.nows = idx;
      this.category = id;
      this.getData();
    },
    getData() {
      console.log(this);
      this.$axios
        .post("/api/api/strat/findstrat", {})
        .then(res => {
          console.log(res.data)
          this.list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    selItem(idx, id) {
      this.now = idx;
      this.nows = 0;
      this.category = id;
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  mounted() {},
  beforeUpdate() {},
  updated() {}
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.foodbook {
  ::-webkit-scrollbar {
    display: none;
  }
  /*.h(9000);*/
  .padding(43, 0, 49, 0);
  .conlist {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: center;
    z-index: 10;
    .hl {
      color: #e7693f;
    }
    li {
      color: #333;
      .w(80);
      text-align: center;
      .lh(43);
      .h(43);
      .fs(18);
      position: relative;
      i {
        color: #e7693f;
        .fs(16);
        position: absolute;
        .bottom(-20);
        .left(32);
      }
    }
  }
  .foodlist {
    .padding(0, 15, 0, 15);
    li {
      .padding(10, 0, 10, 0);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      // .mb(20);
      .img {
        .w(110);
        .h(100);
        // .mr(10);
        // background: skyblue;
        position: relative;
        img {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          z-index: -1;
          width: 100%;
          height: 100%;
        }
      }
      .title {
        .w(225);
        .confs {
          width: 100%;
          .fs(14);
          color: #666;
        }
        .name {
          .mt(5);
          .mb(5);
          .fs(14);
          font-weight: 700;
          color: #333;
        }
        .desc {
          // .mb(16);
          // .h(19);
          .fs(12);
          overflow: hidden;
        }
        .user {
          display: flex;
          color: #e7693f;
          justify-content: space-between;
          span {
            color: #e7693f;
          }
        }
        .look {
          i {
            .mr(5);
            color: #e7693f;
          }
        }
      }
    }
  }
}
</style>