<template>
  <div class="list">
    <Head title="申请记录"></Head>
    <ul class="opt">
      <li
        @click="selItem(index,item.type)"
        :class="now==index?'hl':''"
        v-for="(item,index) in options"
        :key="index"
      >
        <div class="san">{{item.title}}</div>
        <i :class="now==index?'iconfont icon-icon-solidArrow-up':''"></i>
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
        :to="{path:'details',query:{id:item.gid}}"
        v-for="(item,index) in list"
        :key="index"
      >
        <!-- <div class="img">
          <img :src="item.imageUrl" alt>
        </div>-->
        <div class="title">
          <div class="name">{{item.title}}</div>
          <div class="desc confs">{{item.qname}}</div>
          <div class="user confs">
            <!-- {{item.content}} -->
            <span>投递时间：{{item.date}}</span>
          </div>
          <!-- <div class="look confs">
            <i class="iconfont icon-liulan"></i>
            {{item.bookPageViews==null?0:item.bookPageViews}}
          </div>-->
        </div>
      </router-link>
    </ul>
    <div v-show="isok" class="no">暂无数据</div>
    <back-top></back-top>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
import Head from "./Head";
Vue.use(InfiniteScroll);
export default {
  name: "Apply",
  components: { Head },
  data() {
    return {
      options: [{ title: "投递记录", type: null }, { title: "面试邀约", type: 1 }],
      now: 0,
      list: [],
      pageNo: 1,
      cont: null,
      type: "默认排序",
      isok: false
    };
  },
  methods: {
    selItem(index, type) {
      this.now = index;
      this.pageNo = 1;
      this.list = [];
      this.getData(type);
    },
    loadMore() {
      // this.getData();
    },
    getData(pass) {
      // this.toast = Toast({
      //   message: "loading",
      //   iconClass: "fa-spin fa fa-spinner"
      // });
      const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/delivery/finddelivery", {
          xuehao,
          pass
        })
        .then(res => {
          console.log(res.data);
          if (res.msg == "ok") {
            // this.list = this.list.concat(res.data);
            this.list = res.data.reverse();
            console.log(this.list);
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
    this.getData(0);
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
  .opt {
    width: 100%;
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
      .mt(5);
      .padding(0, 15, 0, 15);
      display: flex;
      justify-content: flex-start;
      border-bottom: 5px solid rgba(243, 242, 242, 0.938);
      .title {
        .w(355);
        .confs {
          width: 100%;
          .fs(12);
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
          .mb(7);
          .h(19);
          overflow: hidden;
        }
        .user {
          border-top: 1px solid #ccc;
          .padding(5,0,0,0);
          .mb(6);
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