<template>
    <div id="app">
        <router-view class="router-view" v-slot="{ Component }">
            <transition :name="transitionName" appear mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'App',
    setup() {
        const router = useRouter()
        const state = reactive({
            transitionName: 'slide-left'
        })
        router.beforeEach((to: IKeyValue, from: IKeyValue) => {
            if (to.meta.index > from.meta.index) {
                state.transitionName = 'slide-left'
            } else if (to.meta.index < from.meta.index) {
                state.transitionName = 'slide-right'
            } else {
                state.transitionName = ''
            }
        })

        return {
            ...toRefs(state)
        }
    }
})
</script>

<style lang="scss">
html,
body {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}
#app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 0.43rem;
    overflow-y: scroll;
}
.router-view {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2.13rem;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    height: 100%;
    will-change: transform;
    transition: all 0.5s;
    position: absolute;
    backface-visibility: hidden;
}
.slide-left-enter {
    transform: translateX(100%);
    opacity: 0;
}
.slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-right-enter {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
