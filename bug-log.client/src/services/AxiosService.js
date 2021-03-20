import Axios from 'axios'

const base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'
export const api = Axios.create({
  baseURL: base,
  timeout: 8000,
  withCredentials: true
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
