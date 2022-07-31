import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => request({
    method: 'GET',
    url: '/articles',
    params
})

// 获取关注的用户文章列表
export const getFeedArticles = params => request({
    method: 'GET',
    url: '/articles/feed',
    params
})

// 添加点赞
export const addFavorite = slug => request({
    method: 'POST',
    url: `/articles/${slug}/favorite`
})

// 取消点赞
export const deleteFavorite = slug => request({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`
})

// 获取文章详情
export const getArticle = slug => request({
    method: 'GET',
    url: `/articles/${slug}`
})

// 获取文章评论
export const getComments = slug => request({
    method: 'GET',
    url: `/articles/${slug}/comments`
})