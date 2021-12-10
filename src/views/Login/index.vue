<template>
    <div class="login-view">
        <van-nav-bar :title="state.type ? '登录' : '注册'" />
        <div class="login-view_logo">
            <img src="../../assets/image/logo.png" alt="" />
        </div>
        <div class="login-view_body">
            <van-form @submit="onSubmit" label-width="60px">
                <van-cell-group inset>
                    <van-field
                        v-model="state.username"
                        name="用户名"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="state.password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <van-field
                        class="verify"
                        v-model="state.verify"
                        type="verify"
                        name="验证码"
                        label="验证码"
                        placeholder="输入验证码"
                    >
                        <template #button>
                            <ImageVerify
                                ref="verifyRef"
                                v-bind="tplImageVerify"
                            />
                        </template>
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px">
                    <div class="register" @click="toggle">
                        {{ state.type ? '立即注册' : '已有登录账号' }}
                    </div>
                    <van-button
                        round
                        block
                        type="primary"
                        native-type="submit"
                        color="#1baeae"
                    >
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import ImageVerify from '@/components/VueImageVerify.vue'
import md5 from 'js-md5'
import { Toast } from 'vant'
import { login, register } from '@/apis/login'

const verifyRef = ref()
const state = reactive({
    type: true,
    username: '',
    password: '',
    verify: ''
})

const toggle = () => {
    state.type = !state.type
}
const onSubmit = async () => {
    const { type, username, password, verify } = state
    const imgCode = verifyRef.value.imgCode
    if (verify != imgCode) {
        Toast.fail('验证码错误')
        return
    }
    if (type) {
        const res = await login({
            loginName: username,
            passwordMd5: md5(password)
        })
        console.log(res)
    }
    // else {
    //     const res = await register({
    //         loginName: username,
    //         password
    //     })
    // }

    // console.log(res)
}
const tplImageVerify = computed(() => {
    return { type: state.type }
})
</script>

<style lang="scss">
.login-view {
    &_logo {
        width: 3.2rem;
        height: 3.2rem;
        margin: 2.13333rem auto 0.53333rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .login-view_body {
        padding: 0 20px;
        .verify {
            align-items: center;
            border-bottom: 1px solid #f5f5f5;
        }
        .register {
            font-size: 0.37333rem;
            margin-bottom: 0.53333rem;
            color: #1989fa;
            display: inline-bloc;
        }
    }
}
</style>
