<template>
	<view>
		<view class="top">
			<search @click="goToSearch"></search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 330rpx;">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap='goToDetail(item.goods_id)'>
				<view class="swiper-item">
					<image :src="item.image_src" mode="contain"></image>
				</view>
			</swiper-item>
			
		</swiper>
		<!-- 分类导航 -->
		<view class="cate margin-top-sm">
			<navigator  v-for="(item,index) in navList" :key="index" @tap="goToNav(item)" >
				<image :src="item.image_src" mode="contain" ></image>
			</navigator>
		</view>
		<!-- 商品楼层 -->
		<floor :floorList='floorList'></floor>
	</view>
</template>

<script>
	import floor from '../../components/floor/floor.vue'
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		components:{
			floor
		},
		methods:{
			// 获取轮播图列表
			getSwiperList(){
				uni.$http.get('/home/swiperdata').then((res)=>{
					console.log(res)
					if(res.data.meta.status!==200){
						return uni.$showMsg()
					}else{
						this.swiperList=res.data.message
						// uni.$showMsg("数据请求成功")
					}
				})
			},
			// 点击轮播图去对应商品详情
			goToDetail(id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+id
				})
			},
			// 获取分类导航列表
			getNavList(){
				uni.$http.get('/home/catitems').then((res)=>{
					console.log(res)
					if(res.data.meta.status!==200){
						return uni.$showMsg()
					}else{
						this.navList=res.data.message
						// uni.$showMsg("数据请求成功")
					}
				})
			},
			goToNav(item){
				if(item.name==='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
					
				}
			},
			getFloorList(){
				uni.$http.get('/home/floordata').then(res=>{
					if(res.data.meta.status!==200){
						return uni.$showMsg()
					}else{
						this.floorList=res.data.message
						// uni.$showMsg("数据请求成功")
					}
				})
			},
			goToSearch() {
				// uni.showToast({
				// 	title: '搜索：' + res.value,
				// 	icon: 'none'
				// })
				console.log('1111')
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
			
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.swiper-item image{
		width: 100%;
	}
	.cate{
		display: flex;
		justify-content: space-around;
		image{
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>
