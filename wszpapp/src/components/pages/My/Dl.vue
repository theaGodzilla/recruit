<template>
  <div class="dl">
    <div class="header">
      <ul>
        <i @click="$router.go(-1)" class="iconfont icon-fanhui jiantou"></i>
        <li
          @click="selItem(index)"
          :class="index==sel?'hl':''"
          v-for="(item,index) in nav"
          :key="index"
        >
          <div class="dz">{{item.name}}</div>
          <div class="sj" v-show="index==sel?true:false">
            <i :class="item.tubiao"></i>
          </div>
        </li>
      </ul>
    </div>
    <!-- <router-viwe/> -->
    <Login v-show="show"></Login>
    <Reg v-show="!show"></Reg>
  </div>
</template>
<script type="text/javascript">
import Reg from "./Reg";
import Login from "./Login";
export default {
  name: "Dl",
  components: {
    Reg,
    Login
  },
  data() {
    return {
      nav: [
        { name: "", tubiao: "" },
        { name: "登录", tubiao: "iconfont icon-icon-solidArrow-up" },

        { name: "注册", tubiao: "iconfont icon-icon-solidArrow-up" },

        { name: "", tubiao: "" }
      ],
      sel: 1,
      show: true
    };
  },
  methods: {
    selItem(index) {
      console.log(index);
      this.sel = index;
      this.show = !this.show;
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="less" scoped>
//scoped声明作用域
@import "../../../styles/main.less";
.dl {
  // background:#FDEECE;
  .header {
    border-bottom: 1px solid #ededed;
    ul {
      .w(375);
      .h(44);
      background: #fdeece;
      display: flex;
      text-align: center;
      justify-content: space-between;

      .jiantou {
        display: inline-block;
        .h(22);
        .w(12);
        .lh(22);
        .fs(24);
        margin-top: 13px;
      }
      li {
        display: flex;
        flex: 2;
        .fs(15);
        .w(180);
        .h(44);
        margin-top: 10px;
        // .lh(44);
        flex-direction: column;
        align-items: center;
        // color:black;
        .dz {
          .w(60);
          .h(44);
        }
        .sj {
          .w(60);
          .h(44);
          // color:orange;
        }
      }
      .hl {
        color: orange;
      }
    }
  }
}
</style>