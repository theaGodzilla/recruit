<template>
  <div class="my">
    <p class="me">我的</p>
    <div class="btndl" @click="login">
      <a class="me_a">
        <div class="logo">
          <img :src="img?img:require('../../../../img/timg.jpg')" alt>
        </div>
        <p class="dianji">{{name}}</p>
      </a>
    </div>
    <ul class="meul">
      <li class="meli" v-for="(item,index) in classes" :key="index" @click="goToPage(item.href)">
        <div class="medd">
          <div class="meff">
            <i :class="item.tubiao"></i>
            <em class="mejj">{{item.wenzi}}</em>
          </div>
          <div class="mekk">
            <i :class="item.jiantou"></i>
          </div>
        </div>
      </li>
      <!-- <input v-show="show" type="button" @click="out" value="退出"> -->
      <!-- <input type="button" @click="out" value="退出"> -->
    </ul>
    <mt-button class="input" size="large" type="default" @click="out" plain>退出</mt-button>
    <Footer></Footer>
  </div>
</template>
<script type="text/javascript">
import Vue from "vue";
import Footer from "../../commons/Footer";
import { Button } from "mint-ui";
Vue.component(Button.name, Button);
export default {
  name: "My",
  components: {
    Footer
  },
  data() {
    return {
      classes: [
        {
          tubiao: "iconfont icon-weishoucang",
          wenzi: "我的收藏",
          jiantou: "iconfont icon-fanhui",
          href: "/collection"
        },
        {
          tubiao: "iconfont icon-zuji-outline",
          wenzi: "我的足迹浏览",
          jiantou: "iconfont icon-fanhui",
          href: "/footpr"
        },
        {
          // tubiao: "iconfont icon-cailanzi",
          tubiao: "fa fa-file-text-o",
          wenzi: "我的简历",
          jiantou: "iconfont icon-fanhui",
          href: "/resume"
        },
        {
          tubiao: "iconfont icon-daren",
          wenzi: "个人信息",
          jiantou: "iconfont icon-fanhui",
          href: "/info"
        }
      ],
      name: "点击登录或修改密码",
      img: ""
    };
  },
  computed: {
    show() {
      return this.$store.state.sliderShow;
    }
  },
  methods: {
    login() {
      if (window.localStorage.getItem("user") == null) {
        this.$router.push("dl");
      }
    },
    out() {
      this.name = "点击登录或修改密码";
      this.img = "";
      this.$store.commit("changeLogin", false);
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("info");
      this.$store.commit("changeSliderShow", false);
      // console.log(window.localStorage.getItem('user'))
    },
    goToPage(href) {
      if (window.localStorage.getItem("user")) {
        this.$router.push(href);
      } else {
        this.$router.push("dl/login");
      }
    }
  },
  mounted() {},
  created() {
    if (this.$store.state.login) {
      this.name = JSON.parse(window.localStorage.getItem("info")).name;
      this.img = JSON.parse(window.localStorage.getItem("info")).imgUrl;
      this.$store.commit("changeSliderShow", true);
    } else {
      this.img = "";
      this.name = "点击登录或修改密码";
    }
  }
};
</script>
<style lang="less" scoped>
//scoped声明作用域
@import "../../../styles/main.less";
// @import '../../font_fesfye4intq/iconfont.css';s
// @import '../../styles/base.css';
.my {
  overflow-x: hidden;
  .me {
    .h(44);
    .w(375);
    .fs(18);
    color: #333;
    text-align: center;
    .lh(44);
    border: 1px solid #ccc;
  }
  .btndl {
    .w(375);
    .h(120);
    position: relative;
    background: #f3ebe0;
    display: flex;
    justify-content: space-between;
    .me_a {
      .w(375);
      .h(100);
      .fs(17);
      .padding(20, 0, 0, 20);
      .logo {
        .w(80);
        .h(80);
        overflow: hidden;
        background: #ddd;
        border-radius: 50%;
        img {
          .h(80);
          .w(80);
        }
      }

      .dianji {
        color: #333;
        letter-spacing: 2px;
        position: absolute;
        // .w(133);
        .h(17);
        .top(50);
        .left(110);
      }
    }
  }
  .meul {
    .w(375);
    .meli {
      .padding(0, 10, 0, 10);
      list-style: none;
      border-bottom: 1px solid #ccc;
      .w(375);
      .h(54);
      .lh(54);
      box-sizing: border-box;
      .medd {
        vertical-align: middle;
        .meff {
          float: left;
          .h(54);
          .lh(54);
          .w(160);
          .fs(30);
          i {
            display: inline-block;
            .w(22);
            .h(35);
            // font-size: 35px;
            .fs(26);
            .mr(10);
            color: #ccc;
            // float: right;
          }
          em {
            font-style: normal;
            .lh(54);
            .fs(16);
          }
        }
        .mekk {
          i {
            /* display:inline-block; */
            .w(12);
            .h(54);
            .lh(54);
            float: right;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .input {
    .w(350);
    margin: 0 auto;
    .mt(180);
    .fs(14);
  }
}
</style>