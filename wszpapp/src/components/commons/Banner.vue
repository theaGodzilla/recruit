<template>
  <div class="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide bh" v-for="(item,index) in list" :key="index">
          <img :src="'http://localhost:9000/'+item.img">
        </div>
      </div>
      <!-- Add Pagination -->
      <!--<div class="swiper-pagination wh"></div>-->
      <!-- Add Arrows -->
      <!--<div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>-->
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import Vue from "vue";
export default {
  name: "Banner",
  components: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    getBanner() {
      console.log(this);
      this.$axios
        .post("/api/api/com/comlist", {
          pagesize: 3,
          target: 1
        })
        .then(res => {
          this.list = res.data.comlist;
          console.log(this.list);
          Vue.nextTick(() => {
            this.swiper = new Swiper(".swiper-container", {
              spaceBetween: 10,
              loop: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false
              },
              pagination: {
                el: ".swiper-pagination",
                clickable: true
              }
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  created() {
    this.getBanner();
  },
  destroy() {
    //	    	this.swiper
    delete this.swiper;
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
@import "../../../node_modules/swiper/dist/css/swiper.css";
.banner {
  .bh {
    .w(375);
    .h(180);
    img {
      width: 100%;
    }
  }
}
</style>