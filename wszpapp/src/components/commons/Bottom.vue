<template>
	<div class="bottom">
		<div class="tobottom">
			<i class="fl"></i>
			已经到底了
			<i class="fr"></i>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Bottom',
		components:{
		},
		data(){
			return{

			}
		},
		methods:{
		}
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	.bottom{
		width: 100%;
		.tobottom{
			margin: 0 auto;
			.mt(20);
			.mb(20);
			.w(240);
			.h(16);
			.lh(16);
			text-align: center;
			color: #ccc;
			.fs(16);
			i{
				display: inline-block;
				.mt(8);
				.h(1.2);
				.w(50);
				background: #ccc;
			}
		}
	}
</style>