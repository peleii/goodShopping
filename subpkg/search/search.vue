<template>
	<view class="search_container">
		<view class="search">
			<uni-search-bar @confirm="search" :focus="true" radius="100" v-model="searchValue" @blur="blur"
				@focus="focus" @input="input" @cancel="cancel" @clear="clear" placeholder="请输入想要购买的商品" cancelButton="none" clearButton="auto">
			</uni-search-bar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: ''
			};
		},
		methods: {
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_container {
		.search {
			background-color: #c00000;
		}
	}
</style>
