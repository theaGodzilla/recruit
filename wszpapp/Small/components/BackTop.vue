<template>
	<div class="backTop"
		v-scroll-hide='isShow'
		scroll-hide-distance="650"
		v-show="isShow"
		>
<!--
	v-backtop-hide通过一个自定义指令监听页面滚动事件
-->	
		<div class="back-top" @click="goTop" @mousedown="move">
			<img src="../styles/img/zhitop.1e359ab.png"/>
		</div>
	</div>
	
</template>

<script>
export default {
  name: "back-top",
  data() {
    return {
      isShow: false
    //   positionX: 0,
    //   positionY: 0
    };
  },
  methods: {
    goTop() {
      //				document.documentElement.scrollTop = document.body.scrollTop = 0;
      var timer = setInterval(function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-scrollTop / 8);
        if (scrollTop == 0) {
          clearInterval(timer);
        }
        document.documentElement.scrollTop = document.body.scrollTop =
          scrollTop + ispeed;
      }, 30);
    },
    move(e) {
      let odiv =document.querySelector('.back-top'); //获取目标元素
		console.log(odiv)
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
	  let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {	 
		// e =  e || window.event; 
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
		console.log(left)
        //绑定元素位置到positionX和positionY上面
        // this.positionX = top;
        // this.positionY = left;
		// console.log(this.positionX)
        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/main.less";
.backTop {
  position: fixed;
  .right(15);
  .bottom(60);
  .h(50);
   .w(50);
  .back-top {
	  position: absolute;
    .h(50);
	.w(50);
    img {
      width: 100%;
    }
  }
  &[size="small"] {
    .back-top {
      height: 30px;
      width: 30px;
    }
  }
  &[size="big"] {
    .back-top {
      height: 50px;
      width: 50px;
    }
  }
}
</style>