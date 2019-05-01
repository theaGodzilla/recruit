import BackTop from './components/BackTop';
let scrollEvent=function(distance,vnode){
	return function(){
	let bodyDistance=document.documentElement.scrollTop;
	if(bodyDistance>=distance){
//						setTimeout(function(vonde){
		if(vnode.context.isShow==false){
			vnode.context.isShow=true
		}
//						},1000);
	}else{
		if(vnode.context.isShow){
			vnode.context.isShow=false
		}
	}}
}
export default{
	install(Vue){
		// console.log(666)
		Vue.component('back-top',BackTop)
		Vue.directive('scroll-hide',{
			bind(el,binding,vnode){
				// console.log(el)//自定义指令绑定的节点
				// console.log(binding)//绑定对象
				// console.log(vnode)//虚拟dom
				let distance=el.getAttribute('scroll-hide-distance');//获取设定的阀值
//				console.log(distance)
				window.addEventListener('scroll',scrollEvent(distance,vnode))
			},
			unbind(el,binding,vnode){
				let distance=el.getAttribute('scroll-hide-distance');
				window.removeEventListener('scroll',scrollEvent)
			}
		})
	}
}

