<template>
    <div class="app-tabbar">
        <van-tabbar
            v-model="active"
            active-color="#1baeae"
            inactive-color="#666"
            @change="onChange"
        >
            <van-tabbar-item name="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="/category" icon="apps-o"
                >分类</van-tabbar-item
            >
            <van-tabbar-item
                name="/cart"
                icon="shopping-cart-o"
                :badge="!count ? '' : count"
                >购物车</van-tabbar-item
            >
            <van-tabbar-item name="/my" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
const router = useRouter()
const active = ref('/home')
const count = ref('0')

const onChange = (path: string) => {
    active.value = path
    router.push({
        path
    })
}
onMounted(() => {
    const path = route.path
    const token = store.state.token
    console.log(path, token)

    // if (token && ['/category', '/my'].includes(path)) {

    // }
})

watch(
    () => route.path,
    (newVal, oldVal) => {
        console.log(newVal, oldVal)
        active.value = newVal
    },
    {
        immediate: true
    }
)
</script>
