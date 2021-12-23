<template>
    <div class="cart-view">
        <div class="cart-view__body">
            <NavBar v-bind="tplNavBar"></NavBar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
const state = reactive({})

const tplNavBar = computed(() => {
    return {
        props: {
            leftArrow: false,
            title: '购物车'
        }
    }
})
</script>
<style lang="scss"></style>
