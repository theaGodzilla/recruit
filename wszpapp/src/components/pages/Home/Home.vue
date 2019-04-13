<template>
	<div class="home">
		<Header></Header>
		<Banner></Banner>
		<Share></Share>
		<Footer></Footer>
		<back-top size=''></back-top>
	</div>
</template>

<script>
	import Header from '../../commons/Header';
	import Footer from '../../commons/Footer';
	import Banner from '../../commons/Banner';
	import Share from './Share';
	
	export default{
		name:'home',
		components:{
			Header,
			Banner,
			Share,
			Footer
		},
		data(){
			return{
				name:'我是home页面',
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../../../styles/main.less';
.home{
	/*background: @bg-color;*/
	/*.test(@bg-color,@ft-color)*/
}
</style>