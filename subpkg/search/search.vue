<template>
	<view class="search_container">
		<view class="search">
			<uni-search-bar @confirm="search" :focus="true" radius="100" v-model="searchValue" @blur="blur" 
				@focus="focus" @input="input" @cancel="cancel" @clear="clear" placeholder="请输入想要购买的商品" cancelButton="none" clearButton="auto">
			</uni-search-bar>
		</view>
		<view class="suggest_list">
			<view class="suggest_item margin-sm flex space-between" v-for="(item,index) in searchSuggessList" :key='index' @click="goToDetail(item.goods_id)">
				<text class="title">{{item.goods_name}}</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="search_history" v-if="isShowHistory">
			<view class="title">
				<text>搜索历史</text>
				<uni-icons type="trash" size='20' @click="clearSearchHistory"></uni-icons>
			</view>
			<view class="history">
				<text v-for="(item,index) in searchHistory" :key="index" class="history_item" @click="goToList(item)">{{item}}</text>
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
				searchSuggessList:[],
				searchHistory:[],
				isShowHistory:true
			};
		},
		methods: {
			search(res) {
				// uni.showToast({
				// 	title: '搜索：' + res.value,
				// 	icon: 'none'
				// })
				console.log(res.value)
			},
			input(res) {
				clearTimeout(this.timer)
				const that=this
				this.timer=setTimeout(function(){
					that.getSearchSuggestList(res)
				},500)
				console.log('----input:', res)
			},
			clear(res) {
				this.isShowHistory=true
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				// uni.showToast({
				// 	title: 'focus事件，输出值为：' + e.value,
				// 	icon: 'none'
				// })
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
					this.isShowHistory=true
					return false
				}
				
				this.addSearchHistory(kw)	
				uni.$http.get('/goods/qsearch',{query:kw}).then(res=>{
					if(res.data.meta.status!==200){
						return uni.$showMsg()
					}else{
						
						this.searchSuggessList=res.data.message
						this.isShowHistory=false
					}
				})
			},
			goToDetail(id){
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id='+id
				});
			},
			clearSearchHistory(){
				this.searchHistory=[]
				uni.removeStorageSync('kw')
			},
			addSearchHistory(kw){
				const i=this.searchHistory.indexOf(kw)
				if(i<0){
					this.searchHistory.unshift(kw)
				}else{
					// 如果该关键词已经出现，则删掉原来的，再把现在的追加到数组的最前面
					this.searchHistory.splice(i,1)
					this.searchHistory.unshift(kw)
				}
				// 数据持久化处理
				uni.setStorageSync('kw',JSON.stringify(this.searchHistory))
			},
			goToList(kw){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query='+kw
				});
			}
		
		},
		onLoad(){
			this.searchHistory=JSON.parse(uni.getStorageSync('kw')||'[]')
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
	.search_history{
		
		.title{
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #efefef;
			height: 80rpx;
		}
		.history{
			padding: 5px;
			.history_item{
				display: inline-block;
				text-align: center;
				width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-color: #efefef;
				margin-right: 15px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0 5px;
			}
		}
	}
</style>
