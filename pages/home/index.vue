<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">

                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li v-if="user" class="nav-item">
                                <nuxt-link 
                                    :class="{ active: tab == 'your_feed' }"
                                    :to="{ 
                                        name: 'home',
                                        query: {
                                            tab: 'your_feed'
                                        }
                                    }" 
                                    exact
                                class="nav-link">Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link 
                                    :class="{ active: tab == 'global_feed' }"
                                    :to="{ 
                                        name: 'home',
                                        query: {
                                            tab: 'global_feed'
                                        }
                                    }" 
                                    exact
                                class="nav-link">Global Feed</nuxt-link>
                            </li>
                            <li v-if="tag" class="nav-item">
                                <nuxt-link 
                                :class="{ active: tab == 'tag' }"
                                :to="{
                                    name: 'home',
                                    query: {
                                        tab: 'tab',
                                        tag: tag
                                    }
                                }"
                                exact
                                class="nav-link"
                            >#{{ tag }}</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="article in articles" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }">
                                <img :src="article.author.image"/>
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link class="author" :to="{ name: 'profile', params: { username: article.author.username } }">
                                    {{ article.author.username }}
                                </nuxt-link>
                                <span class="date">{{  article.createdAt | formatTime('MMM DD, YYYY')  }}</span>
                            </div>
                            <button :disabled="article.favoriteDisabled" @click="onFavorite(article)" class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ 'active': article.favorited }">
                                <i class="ion-heart"></i> {{  article.favoritesCount }}
                            </button>
                        </div>
                        <nuxt-link :to="{
                            name: 'article',
                            params: {
                                slug: article.slug
                            }
                        }" class="preview-link">
                            <h1>{{ article.title }}</h1>
                            <p>{{ article.description }}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                    
                    <!-- ???????????? -->
                    <nav>
                        <ul class="pagination">
                        <li
                            class="page-item"
                            :class="{
                            active: item === page
                            }"
                            v-for="item in totalPage"
                            :key="item"
                        >
                            <nuxt-link
                            class="page-link"
                            :to="{
                                name: 'home',
                                query: {
                                    page: item,
                                    tag: $route.query.tag,
                                    tab: tab
                                }
                            }"
                            >{{ item }}</nuxt-link>
                        </li>
                        </ul>
                    </nav>
                    <!-- /???????????? -->

                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link 
                                :to="{
                                    name: 'home',
                                    query: {
                                        tab: 'tag',
                                        tag: item
                                    }
                                }" 
                                class="tag-pill tag-default" v-for="item in tags" :key="item">{{ item }}</nuxt-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article.js'
    import { getTags } from '@/api/tag.js'
    import { mapState } from 'vuex'
    export default {
        name: 'HomeIndex',
        async asyncData({ query, store }) {
            const page = parseInt(query.page || 1) // ???url???page
            const limit = 20
            const { tag } = query
            const tab = query.tab || 'global_feed'
            const loadArticles = store.state.user && tab == 'your_feed' ? getFeedArticles : getArticles

            const [ articlesRes, tagRes ] = await Promise.all([
                loadArticles({
                    limit,
                    offset: (page - 1) * limit, // ???????????????
                    tag
                }),
                getTags()
            ])
            const { articles, articlesCount } = articlesRes.data
            const { tags } = tagRes.data

            articles.map(item => ({
                ...item,
                favoriteDisabled: false
            }))
            return {
                articles,
                articlesCount,
                tags,
                page,
                limit,
                tag,
                tab
            }
        },
        watchQuery: ['page', 'tag', 'tab'],
        computed: {
            ...mapState(['user']),
            totalPage() {
                return Math.ceil(this.articlesCount / this.limit)
            }
        },
        methods: {
            async onFavorite(article) {
                article.favoriteDisabled = true
                if (article.favorited) {
                    // ????????????
                    await deleteFavorite(article.slug)
                    article.favorited = false
                    article.favoritesCount += -1
                } else {
                    // ????????????
                    await addFavorite(article.slug)
                    article.favorited = true
                    article.favoritesCount += 1
                }
                article.favoriteDisabled = false
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>