import vue from '../main'
import axios from 'axios'
import url from 'url'
import qs from 'qs'

const methodList = ['get', 'post', 'put', 'patch', 'options', 'head', 'delete']

const locationUrl = url.parse(window.location.origin)
const base = locationUrl.protocol + '//' + locationUrl.hostname

axios.defaults.baseURL = `${base}:3000/api/`
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.timeout = 10000

const callApi = ({ method = 'get', api, param, axiosOptions = {} } = {}) => {
  const $ = axios.create(axiosOptions)
  if (!methodList.includes(method.toLowerCase())) {
    method = methodList[0]
  }
  param = qs.stringify(param)
  return $[method](api, param)
    .then(data => {
      return Promise.resolve(data.data)
    })
    .catch(error => {
      vue.$Message.error({
        content: `[${api}]接口调用失败`,
        duration: 3,
        closable: true
      })
      return Promise.reject(error)
    })
}

export default callApi
