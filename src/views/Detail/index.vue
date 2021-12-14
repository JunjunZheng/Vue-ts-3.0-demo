<template>
    <div class="detail-view">
        <div class="detail-view__body">
            <van-nav-bar
                left-arrow
                title="详情页"
                fixed
                @click-left="onClickLeft"
            />
            <div class="detial-view_body_swiper">
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
                        {{ item }}
                        <img :src="item" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { goodDetail } from '@/apis/detail'

const router = useRouter()
const route = useRoute()
const state: IKeyValue = reactive({
    swriperList: []
})
const onClickLeft = () => {
    history.back()
}

onMounted(async () => {
    const id = route.query.id
    const res = await goodDetail({ id })
    state.swriperList = res.data.goodsCarouselList
    console.log(state.swriperList)
})
</script>
<style lang="scss">
.detail-view__body {
    height: 2000px;
}
</style>
