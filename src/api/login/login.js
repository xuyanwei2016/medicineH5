import request from '@/utils/request.js';
import { requestPath } from '@/utils/global.js';

// 注册，用户名验重
export function getUserRepeatAPI(params) {
    return request({
        url: `${requestPath.memberWap}/permissions/validation/duplicate?account=${params}`,
        method:'get',
    })
}
// 获取注册验证码
export function getCodeAPI(params) {
    return request({
        url: `${requestPath.memberWap}/permissions/register/code?phone=${params}`,
        method:'get',
    })
}
// 立即注册
export function RegisterAPI(data){
    return request({
        url:`${requestPath.memberWap}/permissions/register`,
        method:'post',
        data:data
    })
}
// 密码登录
export function passwordLoginAPI(data){
    return request({
        url:`${requestPath.memberWap}/permissions/login`,
        method:'post',
        data:data
    })
}
// 用户登录次数
export function getCountAPI(params) {
    return request({
        url: `${requestPath.memberWap}/permissions/login/count?account=${params.account}&password=${params.password}`,
        method:'get',
    })
}
//获取图形验证码
export function getImgCodeAPI(params){
    return request({
        url:`${requestPath.memberWap}/permissions/code`,
        method:'get'
    })
}
// 获取手机号登录验证码
export function getLoginCodeAPI(params) {
    return request({
        url: `${requestPath.memberWap}/permissions/login/code?phone=${params}`,
        method:'get',
    })
}
// 验证码快速登录
export function getSignInAPI(params) {
    return request({
        url: `${requestPath.memberWap}/permissions/login/phone?account=${params.account}&code=${params.code}&channel=1`,
        method:'get',
    })
}
//重置密码获取验证码
export function getResetPasswordAPI(params) {
    return request({
        url: `${requestPath.memberWap}/permissions/reset/password?phone=${params}`,
        method:'get',
    })
}
// 重置密码完成
export function completeAPI(data){
    return request({
        url:`${requestPath.memberWap}/permissions/reset/password/verifymessage`,
        method:'post',
        data:data
    })
}
// 手机号码快捷登录没注册时跳转设置密码
export function loginRegisterAPI(data){
    return request({
        url:`${requestPath.memberWap}/permissions/login/register`,
        method:'post',
        data:data
    })
}
// 用户注册协议
export function getAgreementAPI(params){
    return request({
        url:`${requestPath.commonfg}/dictionary/get/agreement`,
        methods:'get',
    })
}