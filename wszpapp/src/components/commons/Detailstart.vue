<template>
  <div class="details">
    <Head title="文章详细"></Head>
    <div class="container">
      <div class="con-top">
        <h2>{{info.title}}</h2>
        <!-- <p v-html="list.companyShortname"></p> -->
        <p>阅读 {{info.count}}</p>
        <div class="img">
          <img :src="info.image" alt>
        </div>
        <div class="con-top-b">
          <div class="left">
            <div class="leftname">年份：{{info.year}}</div>
          </div>
        </div>
        <div class="con-top-b">
          <div class="left">
            <div class="leftname">公司：{{info.companys[0].name}}</div>
          </div>
        </div>
        <div class="con-top-b">
          <div class="left">
            <div class="leftname">职位：{{info.workCategorys[0].name}}</div>
          </div>
        </div>
      </div>

      <div class="con-tips">
        <!-- <div class="title">职位描述</div> -->
        <p v-html="info.info"></p>
      </div>
      <div class="title">评论</div>
      <div class="con-comment" v-for="(item,index) in comment" :key="index">
        <div class="user">
          <div class="left">
            <div class="leftimg">
              <img :src="item.name" alt>
            </div>
            <div class="leftname">{{item.sname}}</div>
          </div>
          <div class="right">{{index+1}}楼</div>
        </div>
        <div class="tok">{{item.content}}</div>
        <div class="icon">
          <!-- <i class="iconfont icon-pinglun"></i> -->
          {{item.date}}
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
          <input type="text" v-model="con" placeholder="评论">
        </div>
        <div @click="addComment()" class="right">发布</div>
      </div>
    </transition>
    <back-top size></back-top>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Head from "./Head";
export default {
  name: "Detailstart",
  components: { Head },
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
      show: true,
      good: null,
      hl: false,
      info: {},
      con: ""
    };
  },
  methods: {
    getData() {
      const { id } = this.$route.query;
      this.$axios
        .post("/api/api/qiy/byId", {
          id
        })
        .then(res => {
          this.list = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    setData() {
      var myDate = new Date();
      const date =
        myDate.getFullYear() +
        "-" +
        (myDate.getMonth() + 1) +
        "-" +
        myDate.getDate();
      const { name, xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/delivery/addr", {
          jid: xuehao,
          gid: this.list._id,
          sname: name,
          xuehao: xuehao,
          qname: this.list.ctype,
          title: this.list.job,
          date: date,
          pass: 0
        })
        .then(res => {
          if (res.msg == "ok") Toast("投递成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    vie() {
      if (window.localStorage.getItem("info")) {
        const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
        this.$axios
          .post("/api/api/delivery/getxg", {
            xuehao,
            gid: this.list._id
          })
          .then(res => {
            if (res == "yes") {
              Toast("已投递该职位");
            } else {
              this.setData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast("请登录");
      }
    },
    vcoll() {
      if (window.localStorage.getItem("info")) {
        const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
        this.$axios
          .post("/api/api/collection/getxg", {
            xuehao,
            sid: this.list._id
          })
          .then(res => {
            if (res == "yes") {
              Toast("已收藏");
            } else {
              this.addcoll();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast("请登录");
      }
    },
    addcoll() {
      const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/collection/addcoll", {
          sid: this.list._id,
          xuehao,
          qname: this.list.ctype,
          title: this.list.job,
          type: 1,
          content: this.list.xueli
        })
        .then(res => {
          if (res.msg == "ok") Toast("收藏成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    s() {
      const { id } = this.$route.query;
      this.$axios
        .get("/wl/mjfx/view", {
          params: {
            client: "m",
            encrypt: 0,
            id: id
          }
        })
        .then(res => {
          console.log(res.info);
          this.info = res.info;
        })
        .catch(err => {
          this.toast.close();
          console.log(err);
        });
    },
    addComment() {
      var myDate = new Date();
      const date =
        myDate.getFullYear() +
        "-" +
        (myDate.getMonth() + 1) +
        "-" +
        myDate.getDate();
      const { name, xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/comment/addcom", {
          pid: this.info.id,
          sname: name,
          xuehao,
          content: this.con,
          date
        })
        .then(res => {
          console.log(res);
          if (res.msg == "ok"){
            this.getComment();
            this.con='';
            this.show=true
          } 
        })
        .catch(err => {
          console.log(err);
        });
    },
    getComment() {
      const { id } = this.$route.query;
      this.$axios
        .post("/api/api/comment/findcom", {
          pid: id
        })
        .then(res => {
          this.comment = res.data;
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
    this.getData();
    this.s();
    this.getComment();
  },
  destroy() {}
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.details {
  overflow-x: hidden;
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
    .h(215);
    overflow: hidden;
    background: #fff;
    position: relative;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 100%;
    }
  }
  .container {
    .padding(0, 15, 0, 15);
    .con-top {
      .mb(10);
      h2 {
        .margin(10, 0, 0, 0);
        width: 100%;
        // .h(28);
        .lh(28);
        .fs(16);
        // font-weight: 700;
        color: #333;
        // text-align: center;
      }
      p {
        .fs(16);
        color: #7f7f7f;
        letter-spacing: 1px;
        .lh(24);
      }
      .con-top-b {
        .mt(5);
        display: flex;
        justify-content: space-between;
        .left {
          .h(20);
          display: flex;
          justify-content: flex-start;
          .leftname {
            // .h(32);
            .lh(20);
            .fs(14);
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
      // border-top: 1px solid #ededed;
      // border-bottom: 1px solid #ededed;
      .con-center-cont {
        // .padding(0, 38, 0, 23);
        .h(35);
        .lh(35);
        .fs(16);
        color: #666;
        display: flex;
        justify-content: start;
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
      border-top: 1px solid #ededed;
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
      border-bottom:1px solid #ccc; 
      .padding(0,0,5,0);
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
        .fs(14);
         color: #ccc;
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