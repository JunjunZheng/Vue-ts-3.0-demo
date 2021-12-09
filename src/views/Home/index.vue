<template>
    <div class="home-view">
        <div class="home-view__body">
            <van-nav-bar
                left-arrow
                title="标题"
                fixed
                :class="headerScroll ? 'active' : ''"
            >
                <template #left>
                    <van-icon
                        name="wap-nav"
                        size="20"
                        :color="headerScroll ? '#fff' : '#1baeae'"
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
                        name="manager"
                        size="20"
                        :color="headerScroll ? '#fff' : '#1baeae'"
                    />
                </template>
            </van-nav-bar>
            <div class="home-view__body_swiper">
                <van-swipe
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="white"
                >
                    <van-swipe-item>1</van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                    <van-swipe-item>4</van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Home',
    setup() {
        const router = useRouter()
        let state = reactive({
            headerScroll: false,
            active: false
        })
        const godetail = () => {
            router.push({
                path: '/detail'
            })
        }
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
        onMounted(() => {
            window.addEventListener('scroll', handleScroll, true)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })
        return {
            ...toRefs(state),
            handleScroll,
            godetail
        }
    }
})
</script>
<style lang="scss">
.home-view {
    height: 1000px;
    .van-nav-bar {
        background-color: rgba(27, 174, 174, 0);
        transition: all 1s;
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
    }
}
</style>
