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
                :badge="store.state.cartCount"
                >购物车</van-tabbar-item
            >
            <van-tabbar-item name="/my" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
const router = useRouter()
const active = ref('/home')

const onChange = (path: string) => {
    active.value = path
    router.push({
        path
    })
}
onMounted(async () => {
    const token = store.state.token
    if (token) {
        store.dispatch('getCart')
    }
})
watch(
    () => route.path,
    (newVal) => {
        active.value = newVal
    },
    {
        immediate: true
    }
)
</script>
<style lang="scss">
.app-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.33rem;
}
</style>
