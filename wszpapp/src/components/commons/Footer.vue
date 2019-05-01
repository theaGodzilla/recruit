<template>
  <div class="footer">
    <ul>
      <router-link
        tag="li"
        active-class="hl"
        :to="{path:item.path}"
        v-for="(item,index) in list"
        :key="index"
      >
        <i :class="item.cl"></i>
        <span class="name">{{item.name}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {
      list: [
        // {cl:'iconfont icon-huabanfuben',name:'首页',path:'/home'},
        { cl: "fa fa-home", name: "首页", path: "/home" },
        // {cl:'iconfont icon-fenlei',name:'消息',path:'/foodbook'},
        { cl: "fa fa-commenting-o", name: "消息", path: "/foodcircle" },
        { cl: "fa fa-leanpub", name: "宝典", path: "/foodbook" },
        // {cl:'iconfont icon-pengyouquan',name:'资讯',path:'/foodcircle'},
        // {cl:'fa fa-file-text-o',name:'资讯',path:'/resume'},
        { cl: "iconfont icon-wode", name: "我的", path: "/my" }
      ],
      sel: 0
    };
  },
  methods: {
    // selItem(index){
    // 	this.sel=index
    // }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.footer {
  box-shadow: 0 0 10px #d5d0d0;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  ul {
    display: flex;
    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-align: center;
      .h(49);
      flex: 1;
      i {
        .fs(26);
      }

      .name {
        color: #333;
        .fs(12);
      }
    }
    .hl {
      color: #e7693f;
    }
  }
}
</style>