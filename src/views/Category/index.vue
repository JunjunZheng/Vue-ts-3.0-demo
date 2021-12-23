<template>
    <div class="category_view">
        <div class="category_view__body">
            <van-nav-bar left-arrow @click-left="onClickLeft" fixed>
                <template #title>
                    <div class="header-search" @click="goProduct()">
                        <van-icon name="search" size="18" color="#232326" />
                        <span>全场50元起步</span>
                    </div>
                </template>
            </van-nav-bar>
            <div class="category_view__body_wrapper">
                <div class="left">
                    <ul class="left-wrap">
                        <li
                            v-for="item in state.categoryList"
                            :key="item.categoryId"
                            :class="[
                                item.categoryId === state.activeId
                                    ? 'active'
                                    : ''
                            ]"
                            @click="selectMenu(item.categoryId)"
                        >
                            {{ item.categoryName }}
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="right-wrap">
                        <div
                            class="right-list"
                            v-for="item in state.secondLevelCategory"
                            :key="item.categoryId"
                        >
                            <div class="title">{{ item.categoryName }}</div>
                            <div class="right-list-content">
                                <div
                                    class="right-list-item"
                                    v-for="product in item.thirdLevelCategoryVOS"
                                    :key="product.categoryId"
                                    @click="goProduct(product.categoryId)"
                                >
                                    <img
                                        src="../../assets/image/logo.png"
                                        alt=""
                                    />
                                    <p class="text">
                                        {{ product.categoryName }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TabBar></TabBar>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import { categoryList } from '@/apis/category'

const router = useRouter()
const state: IKeyValue = reactive({
    categoryList: [],
    activeId: null,
    secondLevelCategory: []
})
const onClickLeft = () => {
    history.back()
}
const goProduct = (categoryId: number | undefined = undefined) => {
    router.push({
        path: '/product-list',
        query: {
            categoryId
        }
    })
}
const selectMenu = (id: number) => {
    state.activeId = id
    state.secondLevelCategory = state.categoryList.find(
        (item: IKeyValue) => item.categoryId == id
    ).secondLevelCategoryVOS
    console.log(state.secondLevelCategory)
}
const getCategoryList = async () => {
    const res = await categoryList()
    state.categoryList = res.data
    state.activeId = res.data[0].categoryId
    state.secondLevelCategory = res.data[0].secondLevelCategoryVOS
}
onMounted(async () => {
    getCategoryList()
})
</script>
<style lang="scss">
.category_view {
    height: 100%;
    box-sizing: border-box;
    padding-top: 1.23rem;
    padding-bottom: 1.33rem;
    overflow: hidden;
    overscroll-behavior: none;
    .category_view__body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .van-nav-bar__title {
            max-width: 80%;
            width: 70%;
            .header-search {
                height: 0.8rem;
                background-color: #f7f7f7;
                border-radius: 0.8rem;
                display: flex;
                align-items: center;
                color: #232326;
                padding: 0px 16px;
                span {
                    font-size: 12px;
                    color: #999;
                    margin-left: 10px;
                }
            }
        }
        .category_view__body_wrapper {
            height: 100%;
            display: flex;
            font-size: 0.37rem;
            overflow: hidden;

            .left {
                height: 100%;
                width: 30%;
                overflow-y: scroll;
                background-color: #f8f8f8;
                .left-wrap {
                    width: 100%;
                    li {
                        height: 1.49rem;
                        text-align: center;
                        line-height: 1.49rem;
                        &.active {
                            color: #1baeae;
                            background-color: #fff;
                        }
                    }
                }
            }
            .right {
                flex: 1;
                overflow-y: scroll;
                touch-action: pan-y;
                padding: 0 10px;
                .right-wrap {
                    .title {
                        width: 100%;
                        font-size: 0.45333rem;
                        font-weight: 500;
                        padding: 0.53333rem;
                    }
                    .right-list-content {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        .right-list-item {
                            width: 33.3%;
                            padding: 0rem 0.11rem;
                            display: flex;
                            flex-direction: column;

                            justify-content: center;
                            align-items: center;
                            margin-bottom: 0.4rem;
                            img {
                                width: 0.8rem;
                                height: 0.8rem;
                            }
                            .text {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
