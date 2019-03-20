const express=require('express');
const router=express.Router();

const ArticleController=require('../controllers/article.controller');

router.post('/save_article',ArticleController.saveArticle);
router.get('/get_articles',ArticleController.getArticles);
router.post('/delete_article',ArticleController.deleteArticle);
router.post('/get_article',ArticleController.getArticle);
router.post('/update_article',ArticleController.updateArticle);
router.post('/get_article_by_category',ArticleController.getArticleByCategory);

module.exports=router;