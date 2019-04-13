<template>
	<div class="header">
		<div class="head">
			<div class="left">
				<i class="iconfont icon-mui-icon-add"></i>
			</div>
			<div class="con">
				<i class="iconfont icon-ipad"></i>
				菜谱、用户等
			</div>
			<div @click="show" class="right">
				<i class="iconfont icon-xiaoxi"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Header',
		components:{
		},
		data(){
			return{

			}
		},
		methods:{
			show(){
				if(window.localStorage.getItem('user')==null){
					this.$router.push('dl/login')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	.header{
		.h(44);
		/*.padding(44,0,0,0);*/
		.head{
			background: #fff;
			position: fixed;
			top: 0;
			left: 0;
			z-index:10;
			width: 100%;
			.h(44);
			background: #fff;
			justify-content: center;
			display: flex;
			align-items: center;
			text-align: center;
			.left{
				flex: 1;
			}
			.con{
				.w(282);
				.h(29);
				.lh(29);
				.fs(14);
				background: #f2f2f2;
				color: #999;
				i{
					.fs(14);
					display: inline-block;
					}
			}
			.right{
				flex: 1;
			}
			i{
				display:block;
				.fs(26);
			}
		}
	}
</style>