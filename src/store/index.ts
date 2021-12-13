import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

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
    caches: IKeyValue
} = {
    token: '',
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
        }
    },
    actions: {
        setToken({ commit }, payload) {
            console.log('action', payload)
            commit('setToken', payload)
        },
        removeToken({ commit }) {
            commit('removeToken')
        }
    }
})
