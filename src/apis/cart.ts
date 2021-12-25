import axios from '../request/index'

// 加入购物车
export function addCart(payload?: IKeyValue): IKeyValue {
    return axios.post('/shop-cart', payload)
}

// 获取购物车产品
export function getCart(payload?: IKeyValue): IKeyValue {
    return axios.get('/shop-cart', { params: { ...payload } })
}
// 购物车商品增加数量
export function modifyCart(payload?: IKeyValue): IKeyValue {
    return axios.put('/shop-cart', payload)
}

// 删除购物车商品
export function deleteCartItem(payload: IKeyValue): IKeyValue {
    const { id, ...requestPayload }: any = payload
    return axios.delete(`/shop-cart/${id}`, { params: { ...requestPayload } })
}

// 提交购物车
export function getByCartItemIds(payload: IKeyValue): IKeyValue {
    return axios.get('/shop-cart/settle', { params: { ...payload } })
}
