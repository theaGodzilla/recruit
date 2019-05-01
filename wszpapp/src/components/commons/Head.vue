<template>
  <div class="header">
    <div class="head">
      <div class="left" @click="handl">
        <i class="iconfont icon-fanhui"></i>
        <!-- <i class="fa fa-chevron-left" aria-hidden="true"></i> -->
      </div>
      <div class="con">
        <!-- <i class="iconfont icon-ipad"></i> -->
        {{title}}
      </div>
      <div class="right" @click="send()">
        {{headright}}
        <!-- <i class="iconfont icon-xiaoxi"></i> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  components: {},
  props: ["title", "headright"],
  data() {
    return {};
  },
  methods: {
    handl() {
      this.$router.go(-1);
    },
    send(){
      this.$parent.faSend();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.header {
  .h(44);
  /*.padding(44,0,0,0);*/
  .head {
    background: #f2f2f2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    .h(44);
    background: #f2f2f2;
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;
    .left {
      flex: 1;
      color: orange;
    }
    .con {
      .w(282);
      .h(29);
      .lh(29);
      .fs(16);
      // background: #4a90e6;
      background: #f2f2f2;
      // color: #999;
      i {
        .fs(14);
        display: inline-block;
      }
    }
    .right {
      flex: 1;
      .fs(14);
      color: orange;
    }
    i {
      display: block;
      .fs(22);
    }
  }
}
</style>