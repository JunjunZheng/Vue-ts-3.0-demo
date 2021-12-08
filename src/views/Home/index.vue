<template>
    <div class="home-view">
        <div class="home-view__body">
            <van-nav-bar left-arrow title="标题" fixed>
                <template #left>
                    <van-icon name="search" size="18" />
                </template>
                <template #title>
                    <div class="header-search"></div>
                </template>
            </van-nav-bar>
            <div @click="godetail">进入详情页</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Home',
    setup() {
        const router = useRouter()
        const godetail = () => {
            router.push({
                path: '/detail'
            })
        }
        return {
            godetail
        }
    }
})
</script>
<style lang="scss">
.home-view__body {
    background-color: pink;
}
</style>
