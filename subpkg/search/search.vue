<template>
	<view class="search_container">
		<view class="search">
			<uni-search-bar @confirm="search" :focus="true" radius="100" v-model="searchValue" @blur="blur" 
				@focus="focus" @input="input" @cancel="cancel" @clear="clear" placeholder="请输入想要购买的商品" cancelButton="none" clearButton="auto">
			</uni-search-bar>
		</view>
		<view class="suggest_list">
			<view class="suggest_item margin-sm flex space-between" v-for="(item,index) in searchSuggessList" :key='index'>
				<text class="title">{{item.goods_name}}</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				timer:null, 
				keyWords:'',
				searchSuggessList:[]
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
				clearTimeout(this.timer)
				const that=this
				this.timer=setTimeout(function(){
					that.getSearchSuggestList(res)
					console.log(res)
				},500)
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
			},
			getSearchSuggestList(kw){
				if(kw.length==0){
					this.searchSuggessList=[]
				}
				uni.$http.get('/goods/qsearch',{query:kw}).then(res=>{
					if(res.data.meta.status!==200){
						return uni.$showMsg()
					}else{
						console.log(res)
						this.searchSuggessList=res.data.message
					}
				})
			},
		
		}
	}
</script>

<style lang="scss" scoped>
	.search_container {
		.search {
			position: sticky;
			top: 0;
			z-index: 999;
			background-color: #c00000;
		}
	}
	.suggest_list{
		.suggest_item{
			height: 80rpx;
			border-bottom: 1px solid #efefef;
			.title{
				width: 90%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
			}
			
		}
	}
</style>
