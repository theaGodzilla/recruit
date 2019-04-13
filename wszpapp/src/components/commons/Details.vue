<template>
  <div class="details">
    <div class="top">
      <div class="left btn" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="right btn">
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>
    <div class="img">
      <img :src="list.bookImg" alt>
    </div>
    <div class="container">
      <div class="con-top">
        <h2>{{list.bookName}}</h2>
        <p v-html="list.bookHistory"></p>
        <div class="con-top-b">
          <div class="left">
            <div class="leftimg">
              <img :src="list.bookUserImg" alt>
            </div>
            <div class="leftname">{{list.bookUserName}}</div>
          </div>
          <div class="right">
            <i class="iconfont icon-mui-icon-add"></i>
            <span>关注</span>
          </div>
        </div>
      </div>
      <div class="con-center">
        <ul class="title">食材清单
          <li class="right">加入菜篮子</li>
        </ul>
        <div v-for="(item,index) in list.datas" :key="index" class="con-center-cont">
          {{item.dataName}}
          <div class="num">{{item.dataAmmount}}</div>
        </div>
      </div>
      <div class="con-steps title">烹饪步骤</div>
      <ul class="con-img">
        <li v-for="(item,index) in list.steps" :key="index">
          <p>步骤
            <span>{{index+1}}</span>
            /{{list.steps.length}}
          </p>
          <div class="con-imgs">
            <img :src="item.stepImg" alt>
          </div>
          <div class="con-imgs-desc">{{item.stepDesc}}</div>
        </li>
      </ul>
      <div class="con-tips">
        <div class="title">小贴士</div>
        <p v-html="list.bookTips"></p>
      </div>
      <ul class="title">学做这道菜
        <li class="right">
          <i class="iconfont icon-shoucang"></i>查看全部
        </li>
      </ul>
      <div class="con-photo">
        <i class="iconfont icon-index"></i>
        学会了吗？学会了就拍照上传吧
      </div>
      <div class="title">评论</div>
      <div class="con-comment" v-for="(item,index) in comment" :key="index">
        <div class="user">
          <div class="left">
            <div class="leftimg">
              <img :src="item.commentAvatar" alt>
            </div>
            <div class="leftname">{{item.commentNickname}}</div>
          </div>
          <div class="right">{{index+1}}楼</div>
        </div>
        <div class="tok">{{item.content}}</div>
        <div class="icon">
          <i class="iconfont icon-pinglun"></i>
        </div>
      </div>
    </div>
    <transition enter-active-class="fadeInUp delay-zdys" leave-active-class="fadeOutDown">
      <ul class="bottom animated" v-show="show" :key="1">
        <li v-for="(item,index) in bottomlist" :key="index" @click="selcomment(index)">
          <i :class="good==index?hl==true?item.icon+' '+'hl':item.icon:item.icon"></i>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </transition>
    <transition
      enter-active-class="animated fadeInUp delay-zdys"
      leave-active-class="animated fadeOutDown"
    >
      <div class="bottomcomment" v-show="!show" :key="2">
        <div class="left" @click="selcomment()">取消</div>
        <div class="conter">
          <input type="text" placeholder="评论">
        </div>
        <div class="right">发布</div>
      </div>
    </transition>
    <back-top size></back-top>
  </div>
</template>

<script>
export default {
  name: "Details",
  components: {},
  data() {
    return {
      bottomlist: [
        // { icon: "fa fa-heart-o", name: "点赞" },
        { icon: "iconfont icon-aixinon", name: "点赞" },
        { icon: "iconfont icon-shoucang", name: "收藏" },
        { icon: "iconfont icon-pinglun", name: "评论" }
      ],
      list: [],
      comment: [],
      // bookId:'',
      // bookUserId:'',
      show: true,
      good: null,
      hl: false
    };
  },
  methods: {
    getData() {
      let bookId = this.$route.query.bookId;
      let bookUserId = this.$route.query.bookUserId;
      //   console.log(this);
      this.$axios
        .get("/api/fx2/cookbook/cookbookInfo", {
          params: {
            bookId: bookId,
            bookUserId: bookUserId
          }
        })
        .then(res => {
          this.list = res.cookBook;
          this.comment = res.comments;
          console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selcomment(index) {
      if (index <= 1) {
        if (window.localStorage.getItem("user") == null) {
          this.$router.push("dl/login");
        } else {
          this.good = index;
          this.hl = !this.hl;
        }
      } else {
        this.show = !this.show;
      }
    }
  },
  mounted() {},
  created() {
    // this.bookId = this.$route.query.bookId;
    // this.bookUserId = this.$route.query.bookUserId;
    this.getData();
  },
  destroy() {}
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.details {
  .padding(0, 0, 49, 0);
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .padding(12, 11, 0, 11);
    display: flex;
    justify-content: space-between;
    .btn {
      .h(40);
      .w(40);
      .lh(40);
      text-align: center;
      border-radius: 100%;
      background: rgba(0, 0, 0, 0.653);
      i {
        display: block;
        .fs(23);
        color: #fff;
      }
    }
  }
  .img {
    .h(260);
    overflow: hidden;
    background: skyblue;
    position: relative;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 100%;
      width: 100%;
    }
  }
  .container {
    .padding(0, 15, 0, 15);
    .con-top {
      h2 {
        .margin(10, 0, 12, 0);
        width: 100%;
        .h(35);
        .lh(35);
        .fs(20);
        font-weight: 700;
        color: #333;
        text-align: center;
      }
      p {
        .fs(16);
        color: #7f7f7f;
        letter-spacing: 1px;
        .lh(24);
      }
      .con-top-b {
        .mt(15);
        display: flex;
        justify-content: space-between;
        .left {
          .h(32);
          display: flex;
          justify-content: flex-start;
          .leftimg {
            .mr(8);
            .h(32);
            .w(32);
            background: skyblue;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            img {
              position: absolute;
              width: 100%;
            }
          }
          .leftname {
            .h(32);
            .lh(32);
            .fs(15);
            color: #333;
          }
        }
        .right {
          .w(73);
          .h(28);
          color: #e38845;
          .fs(15);
          .lh(28);
          text-align: center;
          border: 1px solid #e38845;
          border-radius: 2px;
          i {
            font-weight: 600;
            .fs(14);
          }
        }
      }
    }
    .con-center {
      .mt(15);
      .padding(0, 0, 7, 0);
      border-top: 1px solid #ededed;
      border-bottom: 1px solid #ededed;
      .con-center-cont {
        .padding(0, 38, 0, 23);
        .h(45);
        .lh(45);
        .fs(16);
        color: #666;
        display: flex;
        justify-content: space-between;
        // width: 100%;
      }
    }
    .con-img {
      border-bottom: 1px solid #ededed;
      p {
        .margin(10, 0, 10, 0);
        color: #333;
        .h(17);
        .lh(17);
        .fs(17);
        span {
          display: inline-block;
          .ml(5);
          color: #e7693f;
        }
      }
      .con-imgs {
        .h(225);
        width: 100%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .con-imgs-desc {
        .margin(10, 0, 30, 0);
        color: #666;
        .fs(16);
        .lh(25);
      }
    }
    .con-tips {
      .padding(0, 0, 20, 0);
      border-bottom: 1px solid #ededed;
      p {
        .lh(29);
        color: #666;
        .fs(16);
      }
    }
    .con-photo {
      .h(123);
      width: 100%;
      border: 1px dashed #ededed;
      background: #f2f2f2;
      letter-spacing: 1px;
      color: #c3c3c3;
      .fs(15);
      border-radius: 3px;
      text-align: center;
      i {
        .w(35);
        margin: 0 auto;
        .mt(23);
        display: block;
        .fs(39);
        color: #cccccc;
      }
    }
    .con-comment {
      .mb(10);
      .user {
        display: flex;
        justify-content: space-between;
        .left {
          .h(32);
          //   .w(74);
          display: flex;
          justify-content: flex-start;
          .leftimg {
            .mr(8);
            .h(32);
            .w(32);
            background: skyblue;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            img {
              width: 100%;
              position: absolute;
            }
          }
          .leftname {
            .h(32);
            .lh(32);
            .fs(15);
            color: #333;
          }
        }
        .right {
          .h(32);
          color: #e38845;
          .fs(13);
          .lh(32);
        }
      }
      .tok {
        .lh(28);
        .margin(11, 0, 18, 0);
        .fs(15);
        color: #666;
        letter-spacing: 1px;
      }
      .icon {
        .h(20);
        .lh(20);
        text-align: right;
        i {
          display: block;
          .fs(23);
          color: #ccc;
        }
      }
    }
  }
  .ani {
    transition: all 3s linear 1s;
  }
  .bottom {
    .h(49);
    .padding(0, 40, 0, 40);
    background: #f2f2f2;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      .w(25);
      .h(49);
      .hl {
        color: red;
      }
      i {
        display: inline-block;
        .fs(26);
        color: #cccccc;
      }
      span {
        display: inline-block;
        .mb(3);
        .fs(8);
        color: #333;
      }
    }
  }
  .bottomcomment {
    .h(49);
    align-items: center;
    background: #f2f2f2;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .fs(15);
    .left {
      .w(45);
      .ml(7);
      text-align: center;
      color: #333;
    }
    .conter {
      .w(260);
      background: #fff;
      color: #999;
      border-radius: 3px;
      input {
        .fs(13);
        border: none;
        .w(242);
        .h(30);
        .padding(0, 10, 0, 10);
      }
    }
    .right {
      .w(58);
      .mr(3);
      text-align: center;
      color: #e7693f;
    }
  }
  .title {
    .h(37);
    .lh(37);
    display: flex;
    justify-content: space-between;
    .margin(25, 0, 15, 0);
    color: #333;
    letter-spacing: 1px;
    font-weight: 700;
    .fs(20);
    .right {
      color: #d95b39;
      .fs(17);
      font-weight: 400;
    }
  }
}
</style>