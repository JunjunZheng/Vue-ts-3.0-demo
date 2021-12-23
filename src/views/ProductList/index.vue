<template>
    <div class="product-view">
        <div class="product-view__body">
            <NavBar v-bind="tplNavBar">
                <template #title>
                    <van-search
                        v-model="state.searchValue"
                        placeholder="请输入搜索关键词"
                        shape="round"
                    >
                    </van-search>
                </template>
                <template #right>
                    <div class="search-btn" @click="onSearch">搜索</div>
                </template>
            </NavBar>
            <div class="product-view__body_tabs">
                <van-tabs type="card" color="#1baeae" @click="onTabsClick">
                    <van-tab title="推荐" name=""> </van-tab>
                    <van-tab title="新品" name="new"></van-tab>
                    <van-tab title="价格" name="price"></van-tab>
                </van-tabs>
            </div>
            <div class="product-view__body_content">
                <van-pull-refresh
                    v-model="state.refreshing"
                    @refresh="onRefresh"
                    v-if="state.productList.length"
                >
                    <van-list
                        v-model="state.loading"
                        :finished="state.finished"
                        finished-text="没有更多了"
                        :offset="3"
                        @load="onLoad"
                    >
                        <div
                            class="product-item"
                            v-for="item in state.productList"
                            :key="item.goodsId"
                            @click="productDetail(item.goodsId)"
                        >
                            <img :src="$filters.prefix(item.goodsCoverImg)" />
                            <div class="product-info">
                                <p class="name">{{ item.goodsName }}</p>
                                <p class="subtitle">{{ item.goodsIntro }}</p>
                                <span class="price"
                                    >￥ {{ item.sellingPrice }}</span
                                >
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
                <div class="empty-wrapper" v-else>
                    <img
                        class="empty"
                        src="https://s.yezgea02.com/1604041313083/kesrtd.png"
                        alt="搜索"
                    />
                    <p class="text">搜索想要的商品</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, reactive, onMounted } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getProductList } from '@/apis/product-list'

const state: IKeyValue = reactive({
    searchValue: '',
    activeName: '',
    productList: [],
    loading: false,
    finished: false,
    refreshing: false,
    filter: {
        pageNumber: 1,
        goodsCategoryId: '',
        keyword: '',
        orderBy: ''
    }
})

const route = useRoute()
const router = useRouter()

const onSearch = () => {
    state.filter.keyword = state.searchValue
    onRefresh()
}

const onLoad = async () => {
    if (state.refreshing) {
        state.productList = []
        state.refreshing = false
    }
    if (!state.filter.goodsCategoryId && !state.filter.keyword) {
        state.finished = true
        state.loading = false
        return
    }
    const res = await getProductList({ ...state.filter })
    const { list, totalPage } = res.data
    state.productList = [...state.productList, ...list]
    state.filter.pageNumber = state.filter.pageNumber + 1
    state.loading = false
    if (state.filter.pageNumber > totalPage) {
        state.finished = true
    }
}

const onRefresh = () => {
    state.refreshing = true
    state.finished = false
    state.loading = true
    state.filter.pageNumber = 1
    onLoad()
}

const productDetail = (id: number | string) => {
    router.push({
        path: '/detail',
        query: {
            id
        }
    })
}

const onTabsClick = (value: IKeyValue) => {
    state.filter.orderBy = value
    onRefresh()
}

onMounted(() => {
    state.filter.goodsCategoryId = route.query?.categoryId
    onLoad()
})

onBeforeRouteLeave((to, from, next) => {
    console.log(to, from)
    if (to.name === 'detail') {
        from.meta.keepAlive = true
    } else {
        from.meta.keepAlive = false
    }
    next()
})

const tplNavBar = computed(() => {
    return {
        props: {
            leftArrow: true
        }
    }
})
</script>
<style lang="scss">
.product-view {
    .product-view__body {
        height: 100%;
        .van-nav-bar__title {
            max-width: none;
            width: 68%;
            .van-search {
                padding: 0;
                .van-icon {
                    color: #999;
                }
            }
        }
        .search-btn {
            background-color: #1baeae;
            padding: 0.05rem 0.11rem;
            border-radius: 0.13rem;
            color: #fff;
        }
        .product-view__body_content {
            height: calc(100% - 2.03rem);
            overflow-y: scroll;
            .product-item {
                width: 100%;
                padding: 10px 0;
                border-bottom: 1px solid #dcdcdc;
                display: flex;
                img {
                    width: 140px;
                    height: 120px;
                    padding: 0 10px;
                }
                .product-info {
                    width: 56%;
                    padding: 5px;
                    text-align: left;
                    .name {
                        width: 100%;
                        max-height: 40px;
                        line-height: 20px;
                        font-size: 15px;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .subtitle {
                        width: 100%;
                        max-height: 40px;
                        padding: 10px 0;
                        line-height: 25px;
                        font-size: 0.32rem;
                        color: #999;
                        overflow: hidden;
                    }
                    .price {
                        font-size: 16px;
                    }
                }
            }

            .empty-wrapper {
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .empty {
                    width: 4rem;
                    height: 4rem;
                }
                .text {
                    font-size: 0.37rem;
                    color: #999;
                }
            }
        }
    }
}
</style>
