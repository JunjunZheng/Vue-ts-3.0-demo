<template>
    <div class="create-order-view">
        <div class="create-order-view__body">
            <NavBar v-bind="tplNavBar"></NavBar>
            <div class="create-order-view_content">
                <!-- <div class="address-wrap">
                    <div class="name" @click="goTo">
                        <span>{{ address.userName }} </span>
                        <span>{{ address.userPhone }}</span>
                    </div>
                    <div class="address">
                        {{ address.provinceName }} {{ address.cityName }}
                        {{ address.regionName }} {{ address.detailAddress }}
                    </div>
                    <van-icon class="arrow" name="arrow" />
                </div> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

import { getAddressDetail, getDefaultAddress } from '@/apis/address'

const route = useRoute()
const state = reactive({
    address: {}
})

const load = () => {
    console.log(123)
}

onMounted(() => {
    console.log(route.query)

    load()
})

const tplNavBar = computed(() => {
    return {
        props: {
            leftArrow: true,
            title: '生成订单'
        }
    }
})
</script>
<style lang="scss">
.create-order-view {
    .create-order-view_content {
        .address-wrap {
            margin-bottom: 20px;
            background: #fff;
            position: relative;
            font-size: 14px;
            padding: 15px;
            color: #222333;
            .name,
            .address {
                margin: 10px 0;
            }
            .arrow {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 20px;
            }
            &::before {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                height: 2px;
                background: -webkit-repeating-linear-gradient(
                    135deg,
                    #ff6c6c 0,
                    #ff6c6c 20%,
                    transparent 0,
                    transparent 25%,
                    #1989fa 0,
                    #1989fa 45%,
                    transparent 0,
                    transparent 50%
                );
                background: repeating-linear-gradient(
                    -45deg,
                    #ff6c6c 0,
                    #ff6c6c 20%,
                    transparent 0,
                    transparent 25%,
                    #1989fa 0,
                    #1989fa 45%,
                    transparent 0,
                    transparent 50%
                );
                background-size: 80px;
                content: '';
            }
        }
    }
}
</style>
