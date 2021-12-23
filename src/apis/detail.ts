import axios from '../request/index'

export function goodDetail(payload?: IKeyValue): IKeyValue {
    const { id, ...requestPayload }: any = payload
    return axios.get(`/goods/detail/${id}`, { params: { ...requestPayload } })
}
