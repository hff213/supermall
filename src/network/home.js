import {request} from './request'
export function getHomeMultidata() { 
    return request({
        url:'/人员管理/staffRead.ashx'
    })
 }