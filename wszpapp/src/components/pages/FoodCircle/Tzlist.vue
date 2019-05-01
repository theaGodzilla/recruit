<template>
  <div class="tzlist">
    <ul
      class="list-contain"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(item,index) in list" :key="index">
        <div class="tit">{{item.title}}</div>
        <div class="img">
          <img v-for="(item,index) in item.imgList" :key="index" :src="item" alt>
          <!-- v-if="index<3" -->
        </div>
        <div class="fenl">
          来自
          <span>{{item.label}}</span>
        </div>
        <div class="how">
          <div class="left">
            <span>{{item.nickname}}</span>
            <span>{{item.time}}</span>
          </div>
          <div class="right">
            <i class="iconfont icon-liulan"></i>
            <span>50</span>
            <i class="iconfont icon-shaidanpingjia-copy"></i>
            <span>1</span>
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
import { Toast, InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
import { Spinner } from "mint-ui";
Vue.component(Spinner.name, Spinner);
export default {
  name: "FoodCircle",
  props: {
    urls: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  components: { Bottom },
  data() {
    return {
      name: "我是foodcircle页面",
      list: [],
      pageNo: 1,
      url: "hot"
    };
  },

  methods: {
    loadMore() {},
    del() {
      this.list = [];
      this.pageNo = 1;
    },
    getData(url) {
      this.toast = Toast({
        message: "loading",
        iconClass: "fa-spin fa fa-spinner"
      });
      this.$axios
        .post("/api/api/sss/findSss" + url, {
          pageSize: 10,
          target: this.pageNo
        })
        .then(res => {
          this.list = this.list.concat(res.data.data);
          this.toast.close();

          // console.log(this.list);
        })
        .catch(err => {
          this.toast.close();
          console.log(err);
        });
    }
  },
  beforeCreate() {},
  created() {
    let url = this.url;
    this.getData(url);
    this.url = this.urls;
  },
  mounted() {
    this.$on("tzlist", url => {
      this.getData(url);
      this.del();
    });
  },
  updated() {},
  deactivated() {}
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.tzlist {
  .padding(22, 20, 0, 20);
  ul {
    li {
      .mb(25);
      .tit {
        .fs(16);
        font-weight: 700;
      }
      .img {
        width: 100%;
        overflow: hidden;
        .margin(21, 0, 0, 0);
        display: flex;
        justify-content: flex-start;
        img {
          .mr(10);
          .w(106);
          .h(79);
        }
      }
      .fenl {
        .margin(10, 0, 16, 0);
        .fs(13);
        color: #666;
        span {
          color: #e7693f;
        }
      }
      .how {
        .fs(11);
        .h(11);
        .lh(11);
        display: flex;
        color: #999;
        justify-content: space-between;
        .left {
          span {
            .margin(0, 7, 0, 0);
          }
        }
        .right {
          i {
            .margin(0, 0, 0, 12);
            color: #e7693f;
            .fs(15);
          }
        }
      }
    }
  }
}
</style>