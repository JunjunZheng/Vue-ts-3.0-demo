import axios from '../request/index'

// 分类列表
export function categoryList(payload?: IKeyValue): IKeyValue {
    return axios.get('/categories', payload)
}
