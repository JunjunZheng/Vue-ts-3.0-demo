import axios from '../request/index'

// 获取地址
export function getAddressDetail(payload?: IKeyValue): IKeyValue {
    const { id, ...responsePayload }: any = payload
    return axios.post(`/address${id}`, { params: { ...responsePayload } })
}

// 获取默认地址
export function getDefaultAddress(payload?: IKeyValue): IKeyValue {
    return axios.get('/address/default', { params: { ...payload } })
}
