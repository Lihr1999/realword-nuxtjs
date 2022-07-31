const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回对应的数据对象
export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    // 这个nuxtServerInit 会在服务端渲染期间自动调用
    // 作用：初始化容器数据，传递数据给客户端使用
    nuxtServerInit({ commit }, { req }) {
        let user = null

        // 如果请求头有Cookie
        if (req.headers.cookie) {
            // console.log(req.headers.cookie)
            // 使用 cookieparser 把 cookie字符串转为js 对象
            const parsed = cookieparser.parse(req.headers.cookie)
            // console.log(parsed, 'pa')
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {
                
            }
        }

        // 提交 mutation 修改state状态
        commit('setUser', user)
    }
}