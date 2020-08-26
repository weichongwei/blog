import fetch from './fetch'
export default {
  // 获取该评论下的回复列表
  list(params) {
    return fetch.get('/reply', params);
  },
  destroy(params) {
    return fetch.delete('/reply/' + params.id);
  }
}