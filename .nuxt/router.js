import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _796a89d2 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _27b7e4f2 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _ced4287e = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _b81e5ffe = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _6b6940cb = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _6d9bb015 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _ea89d964 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _796a89d2,
    children: [{
      path: "",
      component: _27b7e4f2,
      name: "home"
    }, {
      path: "/login",
      component: _ced4287e,
      name: "login"
    }, {
      path: "/register",
      component: _ced4287e,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _b81e5ffe,
      name: "profile"
    }, {
      path: "/settings",
      component: _6b6940cb,
      name: "settings"
    }, {
      path: "/editor",
      component: _6d9bb015,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _ea89d964,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
