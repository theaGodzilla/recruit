<template>
  <div class="list">
    <Head title="来信详情"></Head>
    <div class="li">
      <div class="tops">{{data.qname}}</div>
      <div class="bottom">{{data.date}}</div>
    </div>
    <div class="font">尊敬的{{data.sname}}：您好！经过我公司人力资源部的初步筛选，认为您与我公司的职位要求甚为匹配，我司诚挚邀请您来参加面试。请您确认好面试时间准时出席。</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
import Head from "./Head";
Vue.use(InfiniteScroll);
export default {
  name: "Msgd",
  components: { Head },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    getData(id) {
      this.$axios
        .post("/api/api/delivery/findd", {
          id
        })
        .then(res => {
          if (res.msg == "ok") {
            this.data = res.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    const id = this.$route.query.id;
    this.getData(id);
  },
  updated() {
    // this.getData()
  },
  beforeUpdate() {
    //  this.getData()
  },
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.list {
  .padding(5,16,0,16);
  .li {
    .h(50);
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid rgb(193, 190, 190);
    .tops {
      color: black;
      .fs(15);
    }
    .bottom {
      .mt(5);
      width: 100%;
      display: flex;
      color: #ccc;
      justify-content: space-between;
      align-items: center;
      .fs(12);
    }
  }
  .font{
    .mt(12);
    .fs(14);
    color: #999;
    .lh(22);
  }
}
</style>