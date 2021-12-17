import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { getCart } from '@/apis/cart'

const ls = new SecureLS({ isCompression: false })

const id = parseInt('xfsc-h5', 36).toString()

const PersistPlugin = createPersistedState({
    key: id,
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
    }
})
const state: {
    token: string
    cartCount: number | string
    caches: IKeyValue
} = {
    token: '',
    cartCount: '',
    caches: {}
}
export default createStore({
    plugins: [PersistPlugin],
    state,
    getters: {
        token: (state) => state.token || state.caches?.token,
        caches: (state) => state.caches
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload.token
        },
        removeToken(state) {
            state.token = ''
        },
        getCart(state, payload) {
            state.cartCount = payload.cartCount
        }
    },
    actions: {
        setToken({ commit }, payload) {
            commit('setToken', payload)
        },
        removeToken({ commit }) {
            commit('removeToken')
        },
        getCart({ commit }) {
            getCart().then((res: IKeyValue) => {
                commit('getCart', { cartCount: res.data?.length })
            })
        }
    }
})
