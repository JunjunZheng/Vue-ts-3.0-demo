import axios from '../request/index'

export function getProductList(payload?: IKeyValue): IKeyValue {
    return axios.get('/search', { params: { ...payload } })
}
