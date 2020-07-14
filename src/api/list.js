import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';
import qs from 'qs';
/*民族列表*/
export function getNationListAPI(data){
  return request({
    url:`${requestPath.common}/national/page`,
    method:'get',
  })
}


/*文件路径*/
export function getImgLinkAPI(data){
  return request({
    url:`${requestPath.file}/getFilePath?fileName=`+data,
    method:'get',
    /*params:data,*/
  })
}

/*民族列表*/
export function getNationAPI(data){
  return request({
    url:`${requestPath.common}/national/Type/list`,
    method:'get',
  })
}
/*热门搜索*/
export function getHotAPI(data){
  return request({
    url:`${requestPath.commonfg}/hotsw/list?num=10`,
    method:'get',
  })
}

/*资源列表*/
export function getListAPI(data){
  return request({
    url: `${requestPath.resourceweb}/resource/search`,
    method: 'get',
    params: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    },
  });
}
/*评论点赞*/
export function agreeAPI(data){
  return request({
    url:`${requestPath.common}/comment/thumbs-up?commentId=${data.commentId}&singin=${data.singin}&action=${data.action}`,
    method:'post',
  })
}

/*我的评论*/
export function getCommentListAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/personal?goodsType=${data.goodsType}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method:'get',
  })
}

/*获取章节详情*/
export function getDirectoryDetailAPI(data){
  return request({
    url:`${requestPath.resourcefg}/article-library/get?bookId=${data.bookId}&markId=${data.markId}`,
    method:'get',
  })
}

