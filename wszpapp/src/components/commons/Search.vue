<template>
  <div class="list">
    <Head title="搜索"></Head>
    <div class="header">
      <div class="box">
        <div class="sou">
          <i class="iconfont icon-ipad"></i>
          <input v-model="cont" type="text" @keyup.enter="show">
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
        :to="{path:'details',query:{id:item.id}}"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="img">
          <img :src="item.imageUrl" alt>
        </div>
        <div class="title">
          <div class="name">{{item.title}}</div>
          <div class="desc confs">{{item.companyFullname}}</div>
          <div class="user confs">
            {{item.city}}
            <span>薪资：{{item.salaryText}}</span>
          </div>
          <!-- <div class="look confs">
            <i class="iconfont icon-liulan"></i>
            {{item.bookPageViews==null?0:item.bookPageViews}}
          </div>-->
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
  name: "Search",
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
      // this.$router.push({ path: "list", query: { searchKey: this.cont } });
      this.getData();
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
      this.toast = Toast({
        message: "loading",
        iconClass: "fa-spin fa fa-spinner"
      });
      this.$axios
        .post("/api/api/sss/findSss", {
          type: this.type,
          pageSize: 10,
          target: this.pageNo,
          job: this.cont
        })
        .then(res => {
          if (res.msg == 200) {
            // this.isok = res.data.data.length == 0 ? true : false;
            res.data.data.length == 0 && Toast(`暂无"${this.cont}"相关信息`);
            this.list = this.list.concat(res.data.data);
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
    // this.cont = this.$route.query.searchKey;
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
    .mb(25);
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
    .padding(0, 15, 0, 15);
    li {
      display: flex;
      justify-content: flex-start;
      // border-bottom: 1px solid #ccc;
      .mb(20);
      .img {
        .w(125);
        .h(110);
        .mr(10);
        // background: skyblue;
        // position: relative;
        img {
          // position: absolute;
          // top: 0;
          // bottom: 0;
          // left: 0;
          // right: 0;
          // margin: 0 auto;
          width: 100%;
          height: 100%;
        }
      }
      .title {
        .w(210);
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
          .mb(16);
          .h(19);
          overflow: hidden;
        }
        .user {
          display: flex;
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
  .no {
    .fs(16);
    color: #666;
    .padding(0, 0, 0, 31);
  }
}
</style>