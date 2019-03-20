import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Articles from './views/Articles.vue'
import ArticleDetails from './views/ArticleDetails.vue'
import CreateArticle from './views/CreateArticle.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
     {
      path: '/',
      name: 'articles',
      component: Articles
    },
    {
      path: '/category/:name',
      name: 'articles',
      component: Articles
    },
    {
      path: '/article-details/:id',
      name: 'article-details',
      component: ArticleDetails
        
    },
    {
      path: '/createarticle',
      name: 'create-article',
      component: CreateArticle
    }
  ]
})
