<template>
    <div class="detail-view">
        <div class="detail-view__body">
            <van-nav-bar title="详情页" fixed />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Detail'
})
</script>
<style lang="scss">
.detail-view__body {
    height: 2000px;
    background-color: red;
}
</style>
