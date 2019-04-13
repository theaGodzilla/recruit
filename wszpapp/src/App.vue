<template>
  <div id="app">
  	<!--<router-view></router-view>-->
    <router-view/>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Footer from './components/commons/Footer'
export default {
  name: 'App',
  components:{
		Footer
  }
}
</script>

<style>
#app {

}
</style>
