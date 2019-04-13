<template>
  <div class="foodlist">
    <div class="menu">
      <i class="iconfont icon-icon-copy"></i>
      精选菜谱
    </div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <router-link
        tag="li"
        v-for="(item,index) in foodlist"
        :key="index"
        :to="{path:'details',query:{bookId:item.bookId,bookUserId:item.bookUserId}}"
      >
        <a href="JavaScript:;">
          <div class="img">
            <img :src="item.bookImg">
          </div>
          <div class="name">{{item.bookName}}</div>
          <div class="user">
            <div class="userimg">
              <img :src="item.bookUserImg">
            </div>
            <div class="username">{{item.bookUserName}}</div>
          </div>
        </a>
      </router-link>
      <div v-if="allLoaded" style="text-align:center;">没有更多数据了</div>
      <mt-spinner v-show="bottomStatus == 'loading'" color="#e7693f" :type="3">Loading</mt-spinner>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
import { Spinner } from "mint-ui";

Vue.component(Spinner.name, Spinner);
export default {
  name: "FoodList",
  components: {},
  data() {
    return {
      name: "我是home页面",
      foodlist: [],
      pageNo: 1,
      allLoaded: false, //数据是否加载完毕

      bottomStatus: "" //底部上拉加载状态
    };
  },
  methods: {
    loadMore() {
      this.getData();
      //			  this.bottomStatus='';
    },
    getData() {
      this.toast = Toast({
        message: "loading",
        iconClass: "fa-spin fa fa-spinner"
      }); //发起请求
      this.$axios
        .post("/api/api/qiy/findqiy", {
          pagesize: 10,
          target: this.pageNo
        })
        .then(res => {
          console.log("getData", res);
          this.foodlist = this.foodlist.concat(res.data.studerlist);
          this.pageNo++;
          this.toast.close();
          //					this.bottomStatus='loading';
          // console.log(this.foodlist.length);
          //					if(this.foodlist.length==72){
          //						this.allLoaded=true;
          //					}else{
          //						this.allLoaded=false;
          //					}
        })
        .catch(err => {
          console.log(err);
          this.toast.close();
        });
      //				this.bottomStatus='';
    }
  },
  created() {
    // this.getData()
  }
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.foodlist {
  .padding(0, 0, 49, 0);
  .menu {
    .mb(15);
    .fs(17);
    .lh(17);
    .h(17);
    i {
      color: #e7693f;
      .fs(19);
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    li {
      .w(170);
      .mb(15);
      a {
        .img {
          .h(117);
          .w(170);
          .mb(12);
          background: #ccc;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
          }
        }
        .name {
          text-align: center;
          color: #333;
          .fs(15);
          .h(15);
          .lh(15);
          .mb(11);
          font-weight: 700;
        }
        .user {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .userimg {
            .h(32);
            .w(32);
            .mr(10);
            border-radius: 50%;
            background: skyblue;
            overflow: hidden;
            position: relative;
            img {
              position: absolute;
              width: 100%;
            }
          }
          .username {
            color: #696969;
            .fs(11);
          }
        }
      }
    }
  }
}
</style>