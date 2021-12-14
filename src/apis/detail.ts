import axios from '../request/index'

export function goodDetail(payload?: IKeyValue): IKeyValue {
    console.log(payload)
    const { id, ...requestPayload }: any = payload
    return axios.get(`/goods/detail/${id}`, { ...requestPayload })
}
