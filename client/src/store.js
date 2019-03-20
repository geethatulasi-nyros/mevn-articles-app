import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

const BASE_URL="http://10.90.90.148:5000"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   articles:[]
    
  },
  getters:{
  	ARTICLES:state => {
  		return state.articles;
  	}
  },
  mutations: {
    addArticles:(state,articles)=>{
      state.articles=articles
    },
  	addArticle:(state,article)=>{
  		 state.articles.unshift(article)
  	}
  },
  actions: {
  ADD_ARTICLE: async (context,article)=>{
      let uri=BASE_URL+'/save_article/';
      return await Axios.post(uri,article).then((res)=>{
      context.commit("addArticle",res.data.data);
      return res.data;
    });
   },
   GET_ARTICLES: async (context,articles)=>{
      let uri=BASE_URL+'/get_articles/';
      await Axios.get(uri).then((res)=>{
      context.commit("addArticles",res.data.data);
    });
   },
   DELETE_ARTICLE: async (context,article)=>{
      let uri=BASE_URL+'/delete_article/';
      return await Axios.post(uri,article).then((res)=>{
      console.log(res)
      return res.data
    });
   },
    GET_ARTICLE: async (context,article)=>{
    	console.log("article data in store",article);
      let uri=BASE_URL+'/get_article/';
      return await Axios.post(uri,article).then((res)=>{
      console.log('store get_article',res.data.data);
      return res.data;
     });
   },
   UPDATE_ARTICLE: async (context,article)=>{
      console.log("this data for upadate in store",article);
      let uri=BASE_URL+ '/update_article/';
      return await Axios.post(uri,article).then((res)=>{
      return res.data
    });
   },
   GET_ARTICLE_BY_CATEGORY:async (context,category)=>{
      console.log("data in store",category)
      let uri=BASE_URL+'/get_article_by_category/';
      return await Axios.post(uri,category).then((res)=>{
      console.log(res.data);
      context.commit("addArticles",res.data.data);
     });
   }
  }
})
