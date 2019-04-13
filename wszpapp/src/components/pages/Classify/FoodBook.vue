<template>
  <div class="foodbook clearfix">
    <ul class="conlist">
      <li
        :class="index==now?'hl':''"
        @click="selItem(index,item.left[0].category)"
        v-for="(item,index) in list"
        :key="index"
      >
        {{item.top}}
        <i :class="index==now?'iconfont icon-icon-solidArrow-up':''"></i>
      </li>
    </ul>
    <div class="box">
      <ul class="leftlist">
        <li
          :class="idx==nows?'hll':''"
          v-for="(item,idx) in list[now].left"
          :key="idx"
          @click="selCla(idx,item.category)"
        >
          <i :class="item.icon"></i>
          {{item.name}}
          <!--{{item.category}}-->
        </li>
      </ul>
    </div>
    <ul class="rightlist fr">
      <li v-for="(item,index) in name" :key="index">
        <div class="classlist">
          <div class="tit">{{item.category3}}</div>
          <ul>
            <li
              @click="$router.push({path:'list',query:{searchKey:item}})"
              v-for="(item,index) in item.category4"
              :key="index"
            >{{item}}</li>
          </ul>
        </div>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../commons/Footer";
export default {
  name: "FoodBook",
  components: {
    Footer
  },
  data() {
    return {
      list: [
        {
          top: "食材",
          left: [
            {
              icon: "iconfont icon-shucai",
              name: "蔬菜类",
              category: "vegetable"
            },
            { icon: "iconfont icon-rouqin", name: "畜肉类", category: "meat" },
            { icon: "iconfont icon-yu", name: "水产品", category: "products" },
            { icon: "iconfont icon-fan", name: "米面豆乳", category: "flour" },
            { icon: "iconfont icon-dan", name: "禽蛋类", category: "egg" },
            {
              icon: "iconfont icon-shuiguo",
              name: "水果类",
              category: "fruit"
            },
            {
              icon: "iconfont icon-chufangtiaowei",
              name: "调味品",
              category: "condiment"
            }
          ]
        },
        {
          top: "菜谱",
          left: [
            { icon: "iconfont icon-cai", name: "菜式", category: "dishes" },
            {
              icon: "iconfont icon-shaozikuaizi",
              name: "菜系",
              category: "caixi"
            },
            {
              icon: "iconfont icon-renqun",
              name: "人群功效",
              category: "effect"
            },
            { icon: "iconfont icon-index", name: "场景", category: "scene" },
            {
              icon: "iconfont icon-pengrenzhong",
              name: "烹饪方法",
              category: "method"
            },
            { icon: "iconfont icon-kouwei", name: "口味", category: "taste" }
          ]
        }
      ],
      name: [],
      now: 0,
      nows: 0,
      category: "vegetable"
    };
  },
  methods: {
    selCla(idx, id) {
      this.nows = idx;
      this.category = id;
      this.getData();
      console.log(this.category);
    },
    getData() {
      console.log(this);
      this.$axios
        .get("/api/fx2/category2/show", {
          params: {
            category: this.category
          }
        })
        .then(res => {
          this.name = res.category;
          console.log(this.name);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selItem(idx, id) {
      this.now = idx;
      this.nows = 0;
      this.category = id;
      console.log(id);
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  mounted() {},
  beforeUpdate() {},
  updated() {}
};
</script>

<style lang="less" scoped>
@import "../../../styles/main.less";
.foodbook {
  ::-webkit-scrollbar {
    display: none;
  }
  /*.h(9000);*/
  .padding(43, 0, 49, 0);
  .conlist {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: center;
    .hl {
      color: #e7693f;
    }
    li {
      color: #333;
      .w(80);
      text-align: center;
      .lh(43);
      .h(43);
      .fs(16);
      position: relative;
      i {
        color: #e7693f;
        .fs(16);
        position: absolute;
        .bottom(-20);
        .left(32);
      }
    }
  }
  .box {
    position: fixed;
    .top(44);
    left: 0;
    .w(90);
    .h(576);
    overflow: auto;
    /*textarea: hidden;*/
    .leftlist {
      /*.h(9000);*/
      .hll {
        .fs(14);
        background: #f2f2f2;
        color: #e7693f;
      }
      li {
        background: #fff;
        color: #999;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .h(90);
        .w(90);
        .fs(13);
        i {
          .fs(28);
        }
      }
    }
  }
  .rightlist {
    .w(285);
    li {
      .classlist {
        .padding(20, 0, 0, 0);
        width: 100%;
        .tit {
          .fs(14);
          font-weight: 900;
          color: #333;
          text-align: center;
          .margin(0, 0, 20, 0);
        }
        ul {
          width: 100%;
          /*display:flex;*/
          /*justify-content: center;*/
          align-content: flex-start;
          display: flex;
          /*justify-content:space-between;*/
          flex-wrap: wrap;
          li {
            .margin(0, 0, 15, 14);
            .w(74);
            .h(33);
            .lh(33);
            .fs(14);
            text-align: center;
            border: 1px solid #ededed;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>