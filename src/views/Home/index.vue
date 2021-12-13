<template>
    <div class="home-view">
        <div class="home-view__body">
            <van-nav-bar
                left-arrow
                title="标题"
                fixed
                :class="state.headerScroll ? 'active' : ''"
            >
                <template #left>
                    <van-icon
                        name="wap-nav"
                        size="20"
                        :color="state.headerScroll ? '#fff' : '#1baeae'"
                    />
                </template>
                <template #title>
                    <div class="header-search">
                        <span class="header-search-name">新峰商城</span>
                        <span class="header-search-line"> | </span>
                        <span class="header-search-text"
                            >山河无恙，人间皆安</span
                        >
                    </div>
                </template>
                <template #right>
                    <van-icon
                        v-if="state.isLogin"
                        name="manager"
                        size="20"
                        :color="state.headerScroll ? '#fff' : '#1baeae'"
                    />
                    <van-icon
                        v-else
                        size="14"
                        :color="state.headerScroll ? '#fff' : '#1baeae'"
                        >登录</van-icon
                    >
                </template>
            </van-nav-bar>
            <div class="home-view__body_swiper">
                <van-swipe
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="#1baeae"
                    loop
                >
                    <van-swipe-item
                        v-for="(item, index) in state.swiperList"
                        :key="index"
                    >
                        <img :src="item.carouselUrl" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="home-view__body_grid">
                <van-grid :column-num="5" :border="false" square>
                    <van-grid-item
                        v-for="item in state.categoryList"
                        :key="item.categoryId"
                    >
                        <img :src="item.imgUrl" alt="" />
                        <span class="text">{{ item.name }}</span>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="home-view__body_good">
                <div
                    class="home-view__body_good_wrapper"
                    v-for="item in tplGoodList"
                    :key="item.key"
                >
                    <div class="good-title">{{ item.title }}</div>
                    <div class="good-content">
                        <van-grid :column-num="2">
                            <van-grid-item
                                v-for="item2 in item.items"
                                :key="item2.id"
                            >
                                <img
                                    class="good-coente-img"
                                    :src="$filters.prefix(item2.goodsCoverImg)"
                                    alt=""
                                />
                                <div class="good-conent-info">
                                    <span class="title">
                                        {{ item2.goodsName }}
                                    </span>
                                    <span class="good-conent-price"
                                        >￥{{ item2.sellingPrice }}</span
                                    >
                                </div>
                            </van-grid-item>
                        </van-grid>
                        {{ state.tplGoodList }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { indexInfos } from '@/apis/home'
const store = useStore()
const state: IKeyValue = reactive({
    headerScroll: false,
    active: false,
    isLogin: store.state.token,
    swiperList: [],
    categoryList: [
        {
            name: '新蜂超市',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
            categoryId: 100001
        },
        {
            name: '新蜂服饰',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
            categoryId: 100003
        },
        {
            name: '全球购',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
            categoryId: 100002
        },
        {
            name: '新蜂生鲜',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
            categoryId: 100004
        },
        {
            name: '新蜂到家',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
            categoryId: 100005
        },
        {
            name: '充值缴费',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
            categoryId: 100006
        },
        {
            name: '9.9元拼',
            imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
            categoryId: 100007
        },
        {
            name: '领劵',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
            categoryId: 100008
        },
        {
            name: '省钱',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
            categoryId: 100009
        },
        {
            name: '全部',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
            categoryId: 100010
        }
    ],
    indexList: [],
    goodList: [
        {
            key: 'newGoodses',
            title: '新品上线',
            items: []
        },
        {
            key: 'hotGoodses',
            title: '热门商品',
            items: []
        },
        {
            key: 'recommendGoodses',
            title: '最新推荐',
            items: []
        }
    ]
})
const handleScroll = () => {
    const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
    if (scrollTop > 100) {
        state.headerScroll = true
    } else {
        state.headerScroll = false
    }
}

const getIndexInfos = async () => {
    const res = await indexInfos()
    state.swiperList = res.data.carousels
    state.indexList = res.data
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, true)
    getIndexInfos()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const tplGoodList = computed(() => {
    return state.goodList.map((item: IKeyValue) => {
        console.log(item, state.indexList)
        return {
            ...item,
            items: state.indexList[item.key]
        }
    })
})
</script>
<style lang="scss">
.home-view {
    height: 1000px;
    .van-nav-bar {
        background-color: rgba(27, 174, 174, 0);
        transition: all 1s;
        z-index: 999;
        &::after {
            border-bottom-width: 0px;
        }
        &.active {
            background-color: rgba(27, 174, 174, 1);
        }
        .van-nav-bar__title {
            max-width: 70%;
            width: 70%;
            .header-search {
                height: 30px;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 0.8rem;
                display: flex;
                align-items: center;
                &-name {
                    color: #1baeae;
                    font-size: 0.53rem;
                    padding: 0 0.27rem;
                }
                &-text {
                    font-size: 0.32rem;
                    padding: 0rem 0.27rem;
                    color: #666;
                }
            }
        }
    }
    .home-view__body_swiper {
        height: 4.59rem;
        img {
            height: 4.59rem;
        }
    }
    .home-view__body_grid {
        img {
            width: 0.96rem;
            height: 0.96rem;
        }
        .text {
            font-size: 12px;
            padding-top: 4px;
        }
    }
    .home-view__body_good {
        .good-title {
            background: #f9f9f9;
            height: 1.33333rem;
            line-height: 1.33333rem;
            text-align: center;
            color: #1baeae;
            font-size: 0.42667rem;
            font-weight: 500;
        }

        .good-coente-img {
            width: 3.2rem;
            height: 3.2rem;
        }
        .good-conent-info {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            padding: 10px 2px 0px 2px;
            .good-conent-price {
                text-align: center;
                color: #1baeae;
                padding-top: 4px;
            }
        }
    }
}
</style>
