<template>
  <div class="list">
    <Head title="IT职位"></Head>
    <div class="header">
      <div class="box">
        <div class="sou">
          <i class="iconfont icon-ipad"></i>
          <input v-model="cont" type="text" @keyup.enter="show" />
        </div>
        <div class="off" @click="$router.go(-1)">取消</div>
      </div>
    </div>
    <!-- <ul class="opt">
      <li
        @click="selItem(index,item)"
        :class="now==index?'hl':''"
        v-for="(item,index) in options"
        :key="index"
      >
        <div class="san">{{item}}</div>
        <i :class="now==index?'iconfont icon-icon-solidArrow-up':''"></i>
      </li>
    </ul>-->
    <ul
      class="foodlist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <router-link
        tag="li"
        :to="{path:'detailsss',query:{id:item._id}}"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="tops">
          <div class="title">{{item.job}}</div>
          <div class="gz">{{item.gz}}</div>
        </div>
        <div class="bottoms">
          <div class="ctype">{{item.ctype}}</div>
          <div class="address">{{item.address}}</div>
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
  name: "Computer",
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
      this.getData();
    },
    getData() {
      this.toast = Toast({
        message: "loading",
        iconClass: "fa-spin fa fa-spinner"
      });
      const map = { pagesize: 20, target: this.pageNo };
      this.$axios
        .post("/api/api/qiy/findqiy", map)
        .then(res => {
          console.log(res);
          if (res.msg == "请求ok") {
            this.list = this.list.concat(res.data.studerlist);
            console.log(this.list);
            this.pageNo++;
            this.toast.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchData() {
      this.toast = Toast({
        message: "loading",
        iconClass: "fa-spin fa fa-spinner"
      });
      this.$axios
        .post("/api/api/qiy/fqiy", {
          job: this.cont,
          pagesize: 20,
          target: this.pageNo
        })
        .then(res => {
          console.log(res);
          if (res.msg == 200) {
            this.list = this.list.concat(res.data.studerlist);
            this.pageNo++;
            this.toast.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //   this.getData()
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
  .header {
    .h(44);
    .box {
      position: fixed;
      .top(44);
      left: 0;
      right: 0;
      z-index: 100;
      background: #f2f2f2;
      .padding(7, 10, 7, 10);
      display: flex;
      justify-content: space-between;
      .lh(29);
      font-size: 0;
      border-bottom: 1px solid #ededed;
      .sou {
        .w(315);
        .h(29);
        background: white;
        position: relative;
        i {
          color: #cccccc;
          .fs(14);
          position: absolute;
          .left(10);
          .top(0);
        }
        input {
          border: none;
          .h(29);
          .lh(29);
          .w(272);
          .fs(15);
          .padding(0, 12, 0, 30);
        }
      }
      .off {
        .h(29);
        color: #666;
        .fs(14);
      }
    }
  }
  .opt {
    width: 100%;
    // .mb(25);
    border-bottom: 1px solid #ededed;
    display: flex;
    // justify-content: space-around;
    justify-content: space-evenly;
    .hl {
      color: #e7693f;
    }
    li {
      .fs(16);
      .h(49);
      //   .lh(49);
      color: #141414;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      .san {
        .mt(14);
      }
      i {
        display: block;
        .fs(18);
        .h(16);
        .mb(-3);
        color: #e7693f;
      }
    }
  }
  .foodlist {
    li {
      .h(60);
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