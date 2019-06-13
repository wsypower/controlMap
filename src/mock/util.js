const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}

/**
 * @description 请求返回体
 * @author weiyafei
 * @date 2019-06-13-10:21:15
 * @param {Array} data    返回值
 * @param {String} message 返回提示信息
 * @param {Number} code
 * @param {Object} headers
 */
export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const getQueryParameters = options => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = options => {
  return options.body && JSON.parse(options.body)
}
