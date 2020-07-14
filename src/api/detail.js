import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';

/*医家详情*/
export function getDoctorDetailAPI(data){
  return request({
    url: `${requestPath.resourcefg}/authorLibrary/${data}`,
    method: 'get',
  });
}
/*特色疗法 药材详情*/
export function getArticleDetailAPI(data){
  return request({
    url: `${requestPath.resourcefg}/article-library/get/${data}`,
    method: 'get',
  });
}
/*图书详情*/
export function getBookDetailAPI(data){
  return request({
    url: `${requestPath.resourcefg}/ebook/get/${data}`,
    method: 'get',
  });
}

/*查询医家的推荐图书*/
export function getEbookListAPI(data){
  return request({
    url: `${requestPath.resourcefg}/ebook/page?pageNum=1&pageSize=2&authorId=${data}`,
    method: 'get',
  });
}
/*查询医家的推荐特色疗法*/
export function getArticleListAPI(data){
  return request({
    url: `${requestPath.resourcefg}/article-library/page?authorId=${data}&resourceType=39`,
    method: 'get',
  });
}
/*获取评分*/
export function getCountAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/count?resourceId=${data.resourceId}&resourceClass=${data.resourceClass}`,
    method: 'get',
  });
}
/*根据资源查评论*/
export function getCommentListAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/page?resourceId=${data.resourceId}&resourceClass=${data.resourceClass}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
  });
}
/*保存评论*/
export function saveCommentAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/save`,
    method: 'post',
    data
  });
}

/*评论详情*/
export function commentDetailAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/get/${data}`,
    method: 'get',
  });
}



