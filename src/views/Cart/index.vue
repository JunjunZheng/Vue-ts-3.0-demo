<template>
    <div class="cart-view">
        <div class="cart-view__body">
            <NavBar v-bind="tplNavBar"></NavBar>
            <div class="cart-view__body_content">
                <div v-if="state.goodList.length">
                    <van-checkbox-group
                        v-model="state.result"
                        ref="checkboxGroup"
                        @change="groupChange"
                    >
                        <van-swipe-cell
                            v-for="item in state.goodList"
                            :key="item.goodsId"
                        >
                            <div class="good-item">
                                <van-checkbox
                                    :name="item.cartItemId"
                                    checked-color="#1baeae"
                                />
                                <div class="good-img">
                                    <img
                                        :src="
                                            $filters.prefix(item.goodsCoverImg)
                                        "
                                        alt=""
                                    />
                                </div>
                                <div class="good-desc">
                                    <div class="good-title">
                                        <span>{{ item.goodsName }}</span>
                                        <span>x{{ item.goodsCount }}</span>
                                    </div>
                                    <div class="good-btn">
                                        <div class="price">
                                            ¥{{ item.sellingPrice }}
                                        </div>
                                        <van-stepper
                                            integer
                                            :min="1"
                                            :max="5"
                                            :model-value="item.goodsCount"
                                            :name="item.cartItemId"
                                            async-change
                                            @change="onChange"
                                        />
                                    </div>
                                </div>
                            </div>
                            <template #right>
                                <van-button
                                    square
                                    text="删除"
                                    type="danger"
                                    class="delete-button"
                                    @click="deleteGood(item.cartItemId)"
                                />
                            </template>
                        </van-swipe-cell>
                    </van-checkbox-group>
                    <van-submit-bar
                        :price="tplTotalPrice * 100"
                        button-text="结算"
                        button-color="#1baeae"
                        @submit="onSubmit"
                    >
                        <van-checkbox
                            v-model="state.checked"
                            @click="allCheck"
                            checked-color="#1baeae"
                            >全选</van-checkbox
                        >
                    </van-submit-bar>
                </div>
                <div class="empty" v-else>
                    <img
                        class="empty-cart"
                        src="https://s.yezgea02.com/1604028375097/empty-car.png"
                        alt="空购物车"
                    />
                    <div class="title">购物车空空如也</div>
                    <van-button
                        round
                        color="#1baeae"
                        type="primary"
                        @click="goTo"
                        block
                        >前往选购</van-button
                    >
                </div>
            </div>

            <TabBar></TabBar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
import { getCart, modifyCart, deleteCartItem } from '@/apis/cart'
import router from '@/router'

const store = useStore()
const checkboxGroup = ref()
const state: IKeyValue = reactive({
    result: [],
    goodList: [],
    checked: true,
    totalPrice: 0
})

const onChange = async (value: IKeyValue, detail: IKeyValue) => {
    const payload = {
        cartItemId: detail.name,
        goodsCount: value
    }
    await modifyCart(payload)
    state.goodList = state.goodList.map((item: IKeyValue) => {
        return {
            ...item,
            goodsCount: item.cartItemId == detail.name ? value : item.goodsCount
        }
    })
}

const groupChange = (value: IKeyValue) => {
    if (value.length === state.goodList.length) {
        state.checked = true
    } else {
        state.checked = false
    }
    state.result = value
}

const allCheck = () => {
    checkboxGroup.value.toggleAll()
}

const deleteGood = async (id: IKeyValue) => {
    await deleteCartItem({ id })
    store.dispatch('getCart')
    load()
}
const onSubmit = async () => {
    if (state.result.length <= 0) return
    router.push({
        name: 'create-order',
        query: {
            cartItemIds: JSON.stringify(state.result)
        }
    })
}
const goTo = () => {
    router.push('/')
}

const load = async () => {
    const res = await getCart()
    state.goodList = res.data
    if (state.checked) {
        state.result = state.goodList.map((item: IKeyValue) => item.cartItemId)
    }
}

onMounted(() => {
    load()
})

const tplTotalPrice = computed(() => {
    let sum = 0
    let _list = state.goodList.filter((item: IKeyValue) =>
        state.result.includes(item.cartItemId)
    )
    _list.forEach((item: IKeyValue) => {
        sum += item.goodsCount * item.sellingPrice
    })
    return sum
})

const tplNavBar = computed(() => {
    return {
        props: {
            leftArrow: false,
            title: '购物车'
        }
    }
})
</script>
<style lang="scss">
.cart-view__body {
    .cart-view__body_content {
        margin: 16px 0 100px 0;
        padding-left: 10px;
        font-size: 0.32rem;
        .good-item {
            display: flex;
            .good-img {
                img {
                    width: 2.67rem;
                    height: 2.67rem;
                }
            }
            .good-desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                padding: 20px;
                .good-title {
                    display: flex;
                    justify-content: space-between;
                }
                .good-btn {
                    display: flex;
                    justify-content: space-between;
                    .price {
                        font-size: 16px;
                        color: red;
                        line-height: 28px;
                    }
                    .van-icon-delete {
                        font-size: 20px;
                        margin-top: 4px;
                    }
                }
            }
        }
        .delete-button {
            width: 50px;
            height: 100%;
        }
        .empty {
            width: 50%;
            margin: 0 auto;
            text-align: center;
            margin-top: 200px;
            .empty-cart {
                width: 150px;
                margin-bottom: 20px;
            }
            .van-icon-smile-o {
                font-size: 50px;
            }
            .title {
                font-size: 16px;
                margin-bottom: 20px;
            }
        }
    }
    .van-submit-bar {
        bottom: 1.33rem;
    }
}
</style>
