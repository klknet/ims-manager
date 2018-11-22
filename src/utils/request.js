import axios from 'axios'
import config from '../config/settings'

const instance = axios.create()
instance.defaults.timeout =  config.timeout
instance.defaults.baseURL = config.baseURL
instance.defaults.headers.common['Authorization'] = window.localStorage['authorization']

export default instance

