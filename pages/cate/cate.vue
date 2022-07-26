<template>
	<view>
		<view class="cate_ontainer">
			<view class="sideBar">
				<scroll-view scroll-y="true" :style="{height:wh+'px'}">
					<view v-for="(item,index) in cateList" :key="index" class="sideBar_item" :class="index===active?'active':''" @tap='getChildren(item,index)' >{{item.cat_name}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
					<view class="l2">
						<view v-for="(item,index) in cateLevel2" :key="index">
							<view class="title">{{item.cat_name}}</view>
							<view class="l3 flex wrap">
								<view v-for="(i,index) in item.children" :key="index" class="img_box flex" @tap=goToList(i)>
									<image :src="i.cat_icon" mode=""></image>
									<view class="title">{{i.cat_name}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
				wh:0,
				cateList:[],
				active:0,
				// 二级分类列表
				cateLevel2:[],
				scrollTop:0
			};
		},
		methods:{
			getCateList(){
				uni.$http.get('/categories').then(res=>{
					console.log(res)
					if(res.data.meta.status!==200){
						return uni.$showMsg()
					}else{
						this.cateList=res.data.message
					}
				})
			},
			// 左侧导航栏点击事件
			getChildren(item,index){
				this.active=index
				this.cateLevel2=item.children
				this.scrollTop=this.scrollTop===0?1:0
			},
			// 点击商品事件
			goToList(i){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cat_id='+i.cat_id
				})
			}
		},
		onLoad(){
			// 获取可用高度
			const sysInfo=uni.getSystemInfoSync()
			this.wh=sysInfo.windowHeight
			// 获取分类列表
			this.getCateList()
			
		}
	}
</script>

<style lang="scss">
	.cate_ontainer{
		display: flex;
		.sideBar{
			
			width: 20%;	
			.sideBar_item{
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
			}
			.active{
				background-color: #ffffff;
				border-left: 2px solid red;
			}
			
		}
			
		.main{
			width: 80%;
			background: #ffffff;
			// border: 1px solid red;
			.l2{
				.title{
					text-align: center;
					border-bottom: 1px solid #efefef;
					margin-top: 15px;
				}
				.l3{
					.img_box{
						// border: 1px solid red;
						width: 33.33%;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						image{
							width: 60px;
							height: 60px;
						}
						.title{
							text-align: center;
							border-bottom:none;
							margin-top:0;
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>
