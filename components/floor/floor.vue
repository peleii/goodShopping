<template>
	<view class="floor">
		<view  v-for="(item,index) in floorList" :key="index">
		<!-- 	<view>{{item.floor_title.name}}</view> -->
			<image class="title" :src='item.floor_title.image_src'></image>
			<view class="goods_show flex">
				<view class="left">
					<image :src="item.product_list[0].image_src" @tap='goToList(item.product_list[0])'></image>
				</view>
				<view class="right flex wrap">
					<image :src="i.image_src" v-for="(i,index) in item.product_list" :key="index" v-if="index!==0" @tap='goToList(i)'></image>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			floorList:{
				type:Array,
				required:true
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			goToList(i){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?'+i.navigator_url.split('?')[1]
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.title{	
		height: 60rpx;	
	}
	.goods_show{
	// 	padding-left: 5px;
	// 	padding-right: 5px;
		.left{
			image{
				width: 232rpx;
				margin-left: 6px;
			}
		}
		.right{
			image{
				width: 232rpx;
				height: 232rpx;
				margin-left: 7px;
				
			}
		}
	}
	
</style>