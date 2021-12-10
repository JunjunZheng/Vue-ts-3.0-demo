import axios from '../request/index'

export function register(payload: IKeyValue): IKeyValue {
    return axios.post('/user/register', payload)
}

export function login(payload: IKeyValue): IKeyValue {
    return axios.post('/user/login', payload)
}
