import axios from '../request/index'

// 假如购物车
export function addCart(payload?: IKeyValue): IKeyValue {
    return axios.post('/shop-cart', payload)
}

// 获取购物车产品
export function getCart(payload?: IKeyValue): IKeyValue {
    return axios.get('/shop-cart', { params: { ...payload } })
}
