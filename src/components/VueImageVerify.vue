<template>
    <div class="img-verify" @click="handleDraw">
        <canvas
            ref="verify"
            :width="state.width"
            :height="state.height"
        ></canvas>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, reactive, onMounted } from 'vue'

const props = defineProps({
    width: {
        type: Number,
        default: 100
    },
    height: {
        type: Number,
        default: 30
    }
})
const verify = ref()
const state = reactive({
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    width: props.width,
    height: props.height,
    imgCode: ''
})
// 随机数
const randomNum = (max: any, min: any): number => {
    return parseInt(Math.random() * (max - min) + min)
}

// 随机颜色
const randomColor = (max: number, min: number): string => {
    const r = randomNum(min, max)
    const g = randomNum(min, max)
    const b = randomNum(min, max)
    return `rgb(${r},${g},${b})`
}

const draw = () => {
    // 创建画布
    var ctx = verify.value.getContext('2d')
    // 填充颜色
    ctx.fillStyle = randomColor(180, 230)
    // 填充位置
    ctx.fillRect(0, 0, state.width, state.height)

    let imgCode = ''

    // 随机产生字符串
    for (let i = 0; i < 4; i++) {
        const text = state.pool[randomNum(0, state.pool.length)]
        imgCode += text
        // 随机的字体大小
        const fontSize = randomNum(18, 30)
        // 字体随机的旋转角度
        const deg = randomNum(-30, 30)
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = randomColor(80, 150)
        ctx.save()
        ctx.translate(25 * i + 15, 15)
        ctx.rotate((deg * Math.PI) / 180)
        // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
        // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
        // context.fillText(text,x,y,maxWidth);
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
    }
    for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height))
        ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height))
        ctx.strokeStyle = randomColor(180, 230)
        ctx.closePath()
        ctx.stroke()
    }
    // 6.随机产生40个干扰的小点
    for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(
            randomNum(0, state.width),
            randomNum(0, state.height),
            1,
            0,
            2 * Math.PI
        )
        ctx.closePath()
        ctx.fillStyle = randomColor(150, 200)
        ctx.fill()
    }

    return imgCode
}
const handleDraw = () => {
    state.imgCode = draw()
}
onMounted(() => {
    state.imgCode = draw()
})
</script>
<style lang="scss">
.img-verify canvas {
    cursor: pointer;
    display: block;
}
</style>
