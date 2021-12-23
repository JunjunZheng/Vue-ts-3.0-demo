<template>
    <div class="app-navbar">
        <van-nav-bar
            v-bind="propsData.props"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #left v-if="slots.left">
                <slot name="left"></slot>
            </template>
            <template #title v-if="slots.title">
                <slot name="title"></slot>
            </template>
            <template #right v-if="slots.right">
                <slot name="right"></slot>
            </template>
        </van-nav-bar>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, useSlots } from 'vue'

const propsData: IKeyValue = defineProps({
    props: {
        type: Object,
        default: () => {
            return {
                leftArrow: true
            }
        }
    }
})

const emit = defineEmits(['on-click-right'])
const slots = useSlots()

const onClickLeft = () => {
    if (!propsData.props.leftArrow && !propsData.props.onClickLeft) return
    if (typeof propsData.props.onClickLeft === 'function') {
        propsData.props.onClickLeft()
    } else if (propsData.props.leftArrow) {
        history.go(-1)
    }
}
const onClickRight = () => {
    if (!propsData.props.onClickRight) return
    if (typeof propsData.props.onClickRight === 'function') {
        propsData.props.onClickRight()
    } else {
        emit('on-click-right')
    }
}
</script>
