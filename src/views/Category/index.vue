<template>
    <div class="category_view">
        <div class="category_view__body">
            <van-nav-bar left-arrow @click-left="onClickLeft" fixed>
                <template #title>
                    <div class="header-search">
                        <van-icon name="search" size="18" color="#232326" />
                        <span>全场50元起步</span>
                    </div>
                </template>
            </van-nav-bar>
            <div class="category_view__body_wrapper">
                <div class="left">
                    <ul class></ul>
                </div>
                <div class="right"></div>
            </div>
            <TabBar></TabBar>
        </div>
    </div>
</template>
<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'

const onClickLeft = () => {
    history.back()
}
</script>
<style lang="scss">
.category_view {
    height: 100vh;
    box-sizing: border-box;
    padding-top: 1.23rem;
    .category_view__body {
        width: 100%;
        height: 100%;
        background-color: red;
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
    }
}
</style>
