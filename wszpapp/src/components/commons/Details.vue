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
      <img :src="list.imageUrl" alt>
    </div>
    <div class="container">
      <div class="con-top">
        <h2>{{list.title}}</h2>
        <!-- <p v-html="list.companyShortname"></p> -->
        <p>{{list.activeTime.slice(0,10)}}发布</p>
        <div class="con-top-b">
          <div class="left">
            <div class="leftimg">
              <img :src="list.imageUrl" alt>
            </div>
            <div class="leftname">{{list.companyShortname}}</div>
          </div>
          <div @click="vie()" class="right">
            <i class="iconfont icon-mui-icon-add"></i>
            <span>投递</span>
          </div>
        </div>
      </div>
      <div class="con-center">
        <ul class="title">
          职位信息
          <li class="right" @click="vcoll()">
            <i class="iconfont icon-shoucang"></i>收藏
          </li>
        </ul>
        <div class="con-center-cont">
          工作时间：
          <div class="num">{{list.days_a_week}}</div>
        </div>
        <div class="con-center-cont">
          学历要求：
          <div class="num">{{list.educationText}}</div>
        </div>
        <div class="con-center-cont">
          薪资：
          <div class="num">{{list.salaryText}}</div>
        </div>
        <div class="con-center-cont">
          职位类别：
          <div class="num">{{list.categoryNames.join('，')}}</div>
        </div>
        <div class="con-center-cont">
          公司规模：
          <div class="num">{{list.workerNumber}}</div>
        </div>
      </div>
      <!-- <div class="con-steps title">职位描述</div> -->
      <!-- <ul class="con-img">
        <li v-for="(item,index) in list.categoryNames" :key="index">
          <p>
            {{item}}
            <span>{{index+1}}</span>
            /{{item.length}}
          </p>
          <div class="con-imgs">
            <img :src="list.imageUrl" alt>
          </div>
          <div class="con-imgs-desc">{{item.activeTime}}</div>
        </li>
      </ul>-->
      <div class="con-tips">
        <div class="title">职位描述</div>
        <!-- <p v-html="list.workerNumber"></p> -->
        <p>
          1、良好的沟通能力、团队合作精神和工作责任心；
          <br>2、 较强的学习能力，能够不断自我激励，不断进步；
          <br>3、工作踏实、细致、有耐心，能承受较大的工作压力；
          <br>4、有强烈的责任感和良好的团队合作精神，工作积极主动，善于沟通；
          <br>5、具有较强的执行力，能够按照公司编码规范完成工作任务；
          <br>6、具有良好的理解能力、高度的责任心、优秀的学习能力；具备敏锐的互联网产品感知能力；
          <br>7、有保持学习的习惯，关注业界技术发展动态，乐于分享技术，交流经验；
          <br>8、具备高度责任心、善于学习、有良好心态、不急不躁；能承受一定的压力；
        </p>
      </div>
      <div class="con-tips">
        <div class="title">公司福利</div>
        <!-- <p v-html="list.workerNumber"></p> -->
        <p>
          1、具有市场竞争力的薪资待遇；
          <br>2、灵活的调薪机制，每年1-2次调薪；
          <br>3、优厚的年终奖金、绩效奖金；
          <br>4、购买社保；
          <br>5、带薪年休假、法定节假日等；
          <br>6、丰富的员工活动、每月团建活动、员工下午茶、生日会；
          <br>7、员工生日礼物、节假日福利、免费体检、旅游（一年两次）；
          <br>8、各种晋升机会、各种横向纵向发展空间、优秀人才培养计划；
          <br>
        </p>
      </div>
      <!-- <ul class="title">
        公司介绍
        <li class="right">
          <i class="iconfont icon-shoucang"></i>查看全部
        </li>
      </ul>
      <div class="con-photo">
        <i class="iconfont icon-index"></i>
        学会了吗？学会了就拍照上传吧
      </div>-->
      <div class="con-tips">
        <div class="title">公司介绍</div>
        <p>{{list.companyFullname}}</p>
      </div>
      <div class="con-tips">
        <div class="title">工作地址</div>
        <p>{{list.city}}</p>
      </div>
      <!-- <div class="title">工作地址</div> -->
      <!-- <div class="con-comment" v-for="(item,index) in comment" :key="index">
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
      </div>-->
    </div>
    <!-- <transition enter-active-class="fadeInUp delay-zdys" leave-active-class="fadeOutDown">
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
    </transition>-->
    <back-top size></back-top>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
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
      const { id } = this.$route.query;
      this.$axios
        .post("/api/api/sss/findsid", {
          id
        })
        .then(res => {
          if (res.msg == "ok") {
            this.list = res.data[0];
            this.vieFoo();
          }
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
          gid: this.list.id,
          sname: name,
          xuehao: xuehao,
          qname: this.list.companyFullname,
          title: this.list.title,
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
            gid: this.list.id
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
            sid: this.list.id
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
          sid: this.list.id,
          xuehao,
          qname: this.list.companyFullname,
          title: this.list.title,
          type: 1,
          content: this.list.educationText
        })
        .then(res => {
          if (res.msg == "ok") Toast("收藏成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    setFoo() {
      var myDate = new Date();
      const date =
        myDate.getFullYear() +
        "-" +
        (myDate.getMonth() + 1) +
        "-" +
        myDate.getDate();
      const { name, xuehao } = JSON.parse(window.localStorage.getItem("info"));
      this.$axios
        .post("/api/api/footprint/addf", {
          qid: this.list.id,
          xuehao,
          qname: this.list.companyFullname,
          title: this.list.title,
          content: this.list.city,
          date,
          type: 1
        })
        .then(res => {
          if (res.msg == "ok") console.log("fff");
        })
        .catch(err => {
          console.log(err);
        });
    },
    vieFoo() {
      if (window.localStorage.getItem("info")) {
        const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
        this.$axios
          .post("/api/api/footprint/getf", {
            xuehao,
            qid: this.list.id
          })
          .then(res => {
            if (res == "yes") {
              this.delFoo();
            } else {
              this.setFoo();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    delFoo() {
      if (window.localStorage.getItem("info")) {
        const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
        this.$axios
          .post("/api/api/footprint/delfootprint", {
            xuehao,
            qid: this.list.id
          })
          .then(res => {
            if (res.msg == "ok") {
              this.setFoo();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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
    background: #fff;
    position: relative;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 73%;
    }
  }
  .container {
    .padding(0, 15, 0, 15);
    .con-top {
      h2 {
        .margin(10, 0, 12, 0);
        width: 100%;
        .h(28);
        .lh(28);
        .fs(20);
        font-weight: 700;
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