<template>
    <div class="detail-view">
        <div class="detail-view__body">
            <van-nav-bar
                left-arrow
                title="详情页"
                fixed
                @click-left="onClickLeft"
            />
            <div class="detial-view__body_swiper">
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
                        <img :src="$filters.prefix(item)" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="detail-view__body_info">
                <div class="title">{{ state.detailInfo.goodsName }}</div>
                <div class="desc">免邮费 顺丰快递</div>
                <div class="price">￥{{ state.detailInfo.sellingPrice }}</div>
            </div>
            <div class="detail-view__body_intro">
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                    <li>安装服务</li>
                    <li>常见问题</li>
                </ul>
                <div
                    class="product-content"
                    v-html="state.detailInfo.goodsDetailContent || ''"
                ></div>
            </div>
            <van-action-bar>
                <van-action-bar-icon icon="chat-o" text="客服" />
                <van-action-bar-icon
                    icon="cart-o"
                    text="购物车"
                    :badge="store.state.cartCount"
                    @click="goCart"
                />
                <van-action-bar-button
                    color="linear-gradient(to right, #25c1c1, #1baeae)"
                    text="加入购物车"
                    linear-gradient
                    @click="onAddCart(state.detailInfo.goodsId)"
                />
                <van-action-bar-button
                    color="linear-gradient(to right, #25c1c1, #1baeae)"
                    text="立即购买"
                    @click="$router.push('/cart')"
                />
            </van-action-bar>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { goodDetail } from '@/apis/detail'
import { addCart } from '@/apis/cart'

const store = useStore()

const route = useRoute()
const router = useRouter()
const state: IKeyValue = reactive({
    swiperList: [],
    detailInfo: {}
})
const onClickLeft = () => {
    history.back()
}

const onAddCart = async (goodsId: number) => {
    await addCart({
        goodsCount: 1,
        goodsId
    }).then(async () => {
        store.dispatch('getCart')
    })
}
const goCart = () => {
    router.push({
        name: 'cart'
    })
}
onMounted(async () => {
    const id = route.query.id
    const res = await goodDetail({ id })
    state.detailInfo = res.data
    state.swiperList = res.data.goodsCarouselList
})
</script>
<style lang="scss">
.detail-view__body {
    padding: 1.23rem 0.27rem 0rem 0.27rem;
    .detial-view__body_swiper {
        img {
            width: 100%;
            height: 10rem;
        }
    }
    .detail-view__body_info {
        .desc {
            font-size: 0.32rem;
            color: #999;
        }
        .price {
            color: red;
            font-weight: bold;
        }
    }
    .detail-view__body_intro {
        width: 100%;
        ul {
            display: flex;
            justify-content: space-around;
            padding: 0.27rem 0rem;
        }
    }
}
</style>
