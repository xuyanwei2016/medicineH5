/*个人中心*/
import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';

/*获取会员信息*/
export function getMemberAPI(data){
  return request({
    url:`${requestPath.member}/personal-center/get/member?id=${data}`,
    method:'get',
  })
}
/*我的收藏列表*/
export function getCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/page`,
    method:'get',
    params:data,
  })
}
/*添加收藏*/
export function addCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/batch/save`,
    method:'post',
    data:data,
  })
}
/*删除收藏*/
export function delCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/batch/delete`,
    method:'post',
    data:data,
  })
}
/*是否收藏*/
export function isCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/check-is-collect`,
    method:'get',
  })
}
/*我的评论列表*/
export function getCommentListAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/personal?goodsType=2-1&pageNum=1&pageSize=15`,
    method:'get',
  })
}
/*保存评论*/
export function addCommentAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/save`,
    method:'post',
    data
  })
}
/*我的书架列表*/
export function getShelfListAPI(data){
  return request({
    url:`${requestPath.orderfg}/order/page/buy?pageNum=1&pageSize=15&goodsType=2-1`,
    method:'get',
    params:data,
  })
}
/*我的订单列表*/
export function getOrderListAPI(data){
  return request({
    url:`${requestPath.orderfg}/order/page?pageNum=1&pageSize=15`,
    method:'get',
  })
}
/*修改密码*/
export function modifyPasswordAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/reset/old/password`,
    method:'post',
    data,
  })
}

/*验证手机发送验证码*/
export function getCodeAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/verify/code?phone=${data.phone}&action=${data.action}`,
    method:'get',
  })
}

/*验证手机-第二步*/
export function verifyPhoneAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/verify/phone?`+(data.oldPhone?   `oldPhone=${data.oldPhone}&`:'')+`phone=${data.phone}&code=${data.code}`,
    method:'post',
  })
}
/*验证手机 第三 POST /wap/permissions/verify/save*/
export function verifySaveAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/verify/save?`+(data.oldPhone?   `oldPhone=${data.oldPhone}&`:'')+`phone=${data.phone}&code=${data.code}`,
    method:'post',
  })
}
/*验证手机号 GET /wap/permissions/isExist/phone*/
export function verifyPhoneNumAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/isExist/phone?phone=${data.phone}&action=${data.action}`,
    method:'get',
  })
}

/*上传图片*/
export function saveImgAPI(data){
  return request({
    url:`${requestPath.file}upload/avatar`,
    method:'post',
    data,
  })
}
/*保存信息*/
export function saveInfoAPI(data){
  return request({
    url:`${requestPath.member}/personal-center/update/member`,
    method:'post',
    data,
  })
}
/*删除评论*/
export function deleteCommentAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/delete/${data}`,
    method:'post',
  })
}
/*删除个人信息*/
export function deletePMAPI(data){
  return request({
    url:`${requestPath.member}/pm/delete/${data}`,
    method:'post',
  })
}

