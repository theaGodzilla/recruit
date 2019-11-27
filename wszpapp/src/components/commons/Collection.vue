<template>
  <div class="list">
    <Head title="我的收藏"></Head>
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
        :to="{path:item.type==1?'details':'detailstart',query:{id:item.sid}}"
        v-for="(item,index) in list"
        :key="index"
      >
        <div v-show="item.type==0" class="img">
          <img :src="item.content" alt>
        </div>
        <div class="title">
          <div class="name">{{item.title}}</div>
          <div class="user confs">
            {{item.qname}}
            <div @click.stop="delData(item._id)">取消收藏</div>
          </div>
          <div v-show="item.type==1" class="desc confs">{{item.content}}</div>
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
  name: "Collection",
  components: { Head },
  data() {
    return {
      options: [{ title: "职位收藏", type: 1 }, { title: "文章收藏", type: 0 }],
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
      this.$router.push({ path: "list", query: { searchKey: this.cont } });
      this.getData();
    },
    selItem(index, type) {
      this.now = index;
      this.type = type;
      this.pageNo = 1;
      this.list = [];
      this.getData(type);
    },
    loadMore() {
      // this.getData();
    },
    getData(type) {
      // this.toast = Toast({
      //   message: "loading",
      //   iconClass: "fa-spin fa fa-spinner"
      // });
      const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/collection/findcoll", {
          type: type,
          xuehao
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
    },
    delData(id) {
      this.$axios
        .post("/api/api/collection/delcollection", {
          id
        })
        .then(res => {
          console.log(res.data);
          if (res.msg == "ok") {
            Toast("已取消收藏");
            this.getData(1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData(1);
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
      .padding(0, 15, 0, 15);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 5px solid rgba(243, 242, 242, 0.938);
      .mt(10);
      .img {
        .w(80);
        .h(55);
        .mr(10);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        .w(355);
        .confs {
          width: 100%;
          .fs(13);
          color: #666;
        }
        .name {
          .mt(5);
          .mb(1);
          .fs(14);
          font-weight: 700;
          color: #333;
        }
        .desc {
          .mb(5);
          .h(19);
          overflow: hidden;
        }
        .user {
          .mb(3);
          display: flex;
          justify-content: space-between;
          div {
            .fs(12);
            .padding(2, 5, 2, 5);
            border: #e7693f 1px solid;
            color: #e7693f;
            border-radius: 16px;
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