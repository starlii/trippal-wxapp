// /api/api-open.js
import http from '../utils/http.js'

export const getIndexData = (args = {}) => {
  return http.post('/system/open/getIndex', args)
}

export const getHotCities = (args = {}) => {
  return http.get('/basic/open/getIndex', args, true)
}
