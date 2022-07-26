<template>
	<view class="search_container" @click="handleClick">
		<view class="search">
			<uni-icons type="search" size="20"></uni-icons>
			<text class="margin-lf-sm">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		methods:{
			handleClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search_container{
		background-color:#C00000;
		height: 80rpx;
		position: relative;
		.search{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			background-color: #fff;
			width: 90%;
			height: 60rpx;
			border-radius: 30rpx;
			line-height: 60rpx;
			text-align: center;
		}
	}
</style>