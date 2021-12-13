import axios from '../request/index'

export function indexInfos(payload?: IKeyValue): IKeyValue {
    return axios.get('/index-infos', payload)
}
