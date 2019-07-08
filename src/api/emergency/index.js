/*
 * @Author: Mo.xuejuan
 * @Date: 2019-07-08 15:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 登录应急预案列表数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 */

function getEmergencyYuAnList(data){
    return request({
        url: '@test/getEmergencyYuAnList?_t='+ new Date().getTime(),
        method: 'get',
        data: {params: data}
    })
}

export {
    getEmergencyYuAnList
}

