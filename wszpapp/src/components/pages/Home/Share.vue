<template>
  <div class="share">
    <ul>
      <li v-for="(item,index) in list" @click="show(item.href)" :key="index">
        <a href="JavaScript:;">
          <img :src="item.src">
          <span>{{item.name}}</span>
        </a>
      </li>
    </ul>
    <div class="record clearfix">
      <a href="JavaScript:;">
        <img class="sun" src="../../../../static/day.a9330de.png">
        <div class="record-c fl">
          <p>面试邀约</p>
          <span>{{count}}条邀请记录</span>
        </div>
        <div class="record-r fr">
          <div class="iml pad fl">
            <div class="img-l con">
              <img src="../../../../static/food1.c14e8ca.png">
            </div>
          </div>
          <div class="imr pad fl">
            <div class="img-r con">
              <img src="../../../../static/food2.c04bc88.png">
            </div>
          </div>
        </div>
      </a>
    </div>
    <FoodList></FoodList>
  </div>
</template>

<script>
import FoodList from "./FoodList";
export default {
  name: "Share",
  components: {
    FoodList
  },
  data() {
    return {
      list: [
        {
          src: "../../../../static/image/a2.jpg",
          name: "申请记录",
          href: "apply"
        },
        {
          src: "../../../../static/image/a1.jpg",
          name: "计算机类",
          href: "computer"
        },
        {
          src: "../../../../static/image/a3.jpg",
          name: "热门校招",
          href: "list"
        },
        {
          src: "../../../../static/image/a4.jpg",
          name: "求职攻略",
          href: "foodbook"
        }
      ],
      count: 0
    };
  },
  methods: {
    show(href) {
      if (window.localStorage.getItem("user")) {
        this.$router.push(href);
      } else {
        this.$router.push("dl/login");
      }
    },
    getData() {
      if (window.localStorage.getItem("info")) {
        const { xuehao } = JSON.parse(window.localStorage.getItem("info"));
        this.$axios
          .post("/api/api/delivery/finddelivery", {
            xuehao,
            pass: 1
          })
          .then(res => {
            if (res.msg == "ok") {
              this.count = res.data.length;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

  },
  created(){
    this.getData()
  }
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.share {
  /*width:100%;*/
  .padding(0, 10, 0, 10);
  ul {
    .mt(18);
    width: 100%;
    display: flex;
    li {
      flex: 1;
      .h(54);
      a {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
          .h(40);
          .w(40);
          .mb(2);
        }
        span {
          color: #333;
          .fs(10);
        }
      }
    }
  }
  .record {
    /*.h(100);*/
    .margin(20, 0, 20, 0);
    .padding(0, 0, 0, 85);
    position: relative;
    background: rgb(254, 250, 174);
    .sun {
      .w(61);
      .h(57);
      position: absolute;
      top: 0;
      left: 0;
    }
    .record-c {
      color: #333;
      .h(100);
      display: flex;
      flex-direction: column;
      justify-content: center;
      letter-spacing: 2px;
      p {
        .mb(15);
        .fs(18);
        font-weight: 550;
      }
      span {
        .fs(13);
      }
    }
    .record-r {
      position: absolute;
      .top(23);
      .right(38);
      .pad {
        background: rgb(254, 250, 174);
        transform: rotate(45deg);
        border: 1px dashed #6a6952;
        .padding(2, 2, 2, 2);
        .con {
          .h(49);
          .w(49);
          background: #fff;
          img {
            width: 100%;
            transform: rotate(-45deg);
          }
        }
      }
      .iml {
        position: relative;
        z-index: 6;
      }
    }
  }
}
</style>