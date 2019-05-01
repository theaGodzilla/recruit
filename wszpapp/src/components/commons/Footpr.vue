<template>
  <div class="list">
    <Head title="我的足迹"></Head>
    <ul
      class="foodlist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <router-link
        tag="li"
        :to="{path:'details',query:{id:item.qid}}"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="tops">
          <div class="title">{{item.title}}</div>
          <div class="gz"></div>
        </div>
        <div class="bottoms">
          <div class="ctype">{{item.qname}}</div>
          <div class="address"></div>
        </div>
        <div class="bottoms">
          <div class="ctype">{{item.content}}</div>
          <div class="address">{{item.date}}</div>
        </div>
      </router-link>
    </ul>
    <div v-show="isok" class="no">找不到'{{cont}}'相关信息呀</div>
    <back-top></back-top>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
import Head from "./Head";
Vue.use(InfiniteScroll);
export default {
  name: "Footpr",
  components: { Head },
  data() {
    return {
      options: ["默认排序", "收藏最多", "投递最多"],
      now: 0,
      list: [],
      pageNo: 1,
      cont: null,
      type: "默认排序",
      isok: false
    };
  },
  methods: {
    show() {
      this.list = [];
      this.pageNo = 1;
      this.searchData();
    },
    selItem(index, type) {
      this.now = index;
      this.type = type;
      this.pageNo = 1;
      this.list = [];
      this.getData();
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
        .post("/api/api/footprint/findfootprint", {
          xuehao,
          type: 1
        })
        .then(res => {
          console.log(res);
          if (res.msg == "ok") {
            this.list=res.data.reverse()
            // this.list = this.list.concat(res.data.studerlist);
            // console.log(this.list);
            // this.pageNo++;
            // this.toast.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
    this.cont = this.$route.query.searchKey;
  },
  updated() {
    // this.getData()
  },
  beforeUpdate() {
    //  this.getData()
  },
  destroyed() {
    //    delete this.getData()
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.list {
  .foodlist {
    li {
      .h(70);
      .padding(0, 15, 0, 15);
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid rgba(243, 242, 242, 0.938);
      // .mb(20);
      .tops {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fs(14);
        .title {
          color: black;
        }
        .gz {
          color: #e7693f;
        }
      }
      .bottoms {
        .mt(5);
        .fs(12);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .address {
          color: #cccccc;
        }
        .ctype {
          color: #999;
        }
      }
    }
  }
  .no {
    .fs(16);
    color: #666;
    .padding(0, 0, 0, 31);
  }
}
</style>