// /api/api-sys.js
import http from '../utils/http.js'

export const decodeWxUserInfo = (args = {}) => {
  return http.post('/public/decodeWxUserInfo', args)
}

export const checkUserStatus = (args = {}) => {
  return http.post('/basic/bsa/Main/checkUserStatus', args)
}

export const getSmsCode = (args = {}) => {
  return http.post('/public/sendSMSCode',args)
}

export const loginWithSms = (args = {}) => {
  return http.post('/auth/oauth/token?client_id=trippal&client_secret=trippal2019&grant_type=password&scope=all', args)
}

export const loadUserProfile = (args = {}) => {
  return http.post('/bsa/bsaMain/myInfo', args, 11)
}
