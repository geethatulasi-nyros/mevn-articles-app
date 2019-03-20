<template>
  <div class="articlepage">
  <notifications group="message" class="noti-style"/>
  <b-row>
    <b-col cols="3">
    <div class="categories">
    <ul> 
    <b-card>
      <router-link to="/">
        <li class="links text-danger" :class="{active_color:this.$route.params.name === undefined}">All
        </li>
      </router-link> 
	   	<router-link to="/category/Innovation">
        <li class="links" :class="{active_color:active_li ==='Innovation'}"> Innovation
        </li>
      </router-link>
	   	<router-link to="/category/Education">
        <li class="links" :class="{active_color:active_li ==='Education'}"> Education 
        </li>
      </router-link>
	   		<router-link to="/category/Photography">
          <li class="links" :class="{active_color:active_li ==='Photography'}"> Photography 
          </li>
        </router-link>
	   		<router-link to="/category/Writing">
          <li class="links" :class="{active_color:active_li ==='Writing'}"> Writing 
          </li>
        </router-link>
        <router-link to="/category/Food">
          <li  class="links" :class="{active_color:active_li ==='Food'}"> Food
          </li>
        </router-link>
        <router-link to="/category/Health">
          <li  class="links" :class="{active_color:active_li ==='Health'}"> Health
          </li>
        </router-link>
        <router-link to="/category/Movies">
          <li class="links" :class="{active_color:active_li ==='Movies'}"> Movies 
          </li>
        </router-link>
        <router-link to="/category/Science">
          <li class="links" :class="{active_color:active_li ==='Science'}"> Science 
          </li>
        </router-link>
        <router-link to="/category/Technology">
          <li class="links" :class="{active_color:active_li ==='Technology'}"> Technology 
          </li>
        </router-link>
        </b-card>
      </ul>
   </div>
   </b-col>
    
    <b-col cols="8">
	  <div class="article">
      <b-card class="category-name">
        <b-card-text :style="{float:'left'}" v-if="active_li==undefined" show><h5>Feed</h5></b-card-text>      
        <b-card-text :style="{float:'left'}">
        <h5>{{active_li}}</h5></b-card-text>
        <b-card-text :style="{float:'right'}">
        <h5>{{articles.length}}</h5>
        </b-card-text>
      </b-card>
      <div class="articles-block">
      <b-card  v-if="articles.length > 0" show v-for="(article,index) in articles" class="articles-list">
        <b-row>
          <b-col>

            <router-link class="article-title" :to="'/article-details/'+article._id"> {{article.title}}</router-link><br/><br/>
            <b-card-text :style="styleObject">
            {{article.description}}
            <router-link v-if="article.description.length==203" show :to="'/article-details/'+article._id" :style="morestyle">more</router-link>
            </b-card-text>

            <b-card-text :style="{color:'rgba(0,30,60,0.6)',fontWeight:'bold'}">
            <i>{{article.category}}</i>
            </b-card-text>
            </b-col>
            <b-col cols="4">
              <a to="/" @click="deleteArticle(article._id)">
                  <i class="fa fa-times fa-sm" aria-hidden="true" :style="{float:'right'}">
                  </i>
               </a>
            <b-card-img class="images-of-artilces" :src="article.image" img-alt="Card image"  />
          </b-col>
        </b-row>
        </b-card>
        </div>
        <div v-if="articles.length === 0"  show>
          <b-card   class="articles-list">
            <b-card-text class="text-center">
            No articles found
            </b-card-text>
            <b-card-text>
               <p class="text-center" :style="{color:'#2d78da'}">
               <router-link :to="{name:'create-article',params:{category:active_li}}">
                    Create New Article
               </router-link></p>
               
            </b-card-text>
          </b-card>
        </div>
      </div>
      </b-col>
      </b-row>
    </div>
</template>

  
 <script>
 

export default {
 data(){
   return {
      title:'',
      description:'',
      previewImage:'',
      title_error:false,
      category_error:false,
      description_error:false,
      isEdit:false,
      err:false,
      id:0,
      msg:'',
      confirm:false,
       styleObject: {
        width:'460px',
        overflow:'hidden',

      },
      morestyle:{
        marginLeft:'10px',
        color:'#9a6d19'
        }
      }
   },
   mounted()
   {
     document.title="Articles";
    this.$store.dispatch("GET_ARTICLES");
       
	},
  methods:{
  //onchange name validation function//
    validateTitle(event){
      if(event.target.value === '')
      {
        this.title_error=true;
      }
      else{
        this.title_error=false;
      }
    },   
    //onchange select validation function//
    validateCategory(event)
    {
      if(event === null)
      {
        this.category_error=true;
      }
      else{
        this.category_error=false;
      }
    },   
    //onchange feedback validation function//
    validateDescription(event)
    {
      if(event.target.value === '')
      {
        this.description_error=true;
      }
      else{
        this.description_error=false;
      }
    },   
    //onsubmit validation on submitted input fields//
    validateSubmit()
    {
         if(this.title==='')
         {
          this.title_error=true;
         }
         else{
          this.title_error=false;
         }
        if(this.category === null){
          this.category_error=true;
        }
        else{
          this.category_error=false;
        } 
        if(this.description === '')
        {
          this.description_error=true;
        }
        else{
          this.description_error=false;
        }
        if(this.title && this.category && this.description){
          return false; 
        }
        else
        {
          return true;
        }

    }, 
    //add artcile method which will dispatch a method of store//
    addArticle()
    {
    	 let err=this.validateSubmit();
    	 if(!err)
    	 { 
    	  let data={
    	  	title:this.title,
    	  	image:this.previewImage,
    	  	category:this.category,
    	  	description:this.description
    	  }
          this.$store.dispatch("ADD_ARTICLE",data).then((res)=>{
            if(res.status === "success" ){
              this.msg=res.message;
              this.$notify({
                group:'message', 
              	text:'<b><h5>'+this.msg+'</h5></b>',
              	width:'100px',
                speed:1000,
              	duration:800
              });
               this.title="";
               this.category=null;
               this.description="";
               this.previewImage="";
            }
          });
    	 }
    },
    	//delete artcile method which will dispatch a method of store//
    	deleteArticle(id)
      {
        this.err=false;
        let confirm_result=confirm("do you want to delete this todo");
        if(confirm_result)
        {
          let data={id:id}
          this.$store.dispatch("DELETE_ARTICLE",data).then((res)=>{
            if(res.status === "success"){
            this.msg=res.message;
            this.$notify({
              group:'message',
              text:'<b><h5>'+this.msg+'</h5></b>',
              width:'100px',
              speed:1000,
              duration:800
            })
            this.$store.dispatch("GET_ARTICLES");
            }
          });
        }
      },
      //update artcile method which will dispatch a method of store//
      updateArticle(id,title,description,category,previewImage)
      {
        let err=this.validateSubmit();
        if(!err){
          let data={
        	id:id,
        	title:title,
        	description:description,
        	category:category,
        	image:previewImage
          }
          this.$store.dispatch("UPDATE_ARTICLE",data).then((res)=>{
            if(res.status === "success"){
            this.$store.dispatch("GET_ARTICLES");
            this.name="";
            this.isEdit=false;
            this.msg=res.message;
            this.$notify({ 
              group:'message',
              text:'<b><h5>'+this.msg+'</h5></b>',
              width:'100px',
              speed:1000,
              duration:800
            })
            }
          });
        }
      },
      //edit method for editing the article//
      editArticle(article)
      {
        this.id=article._id;
        this.title=article.title;
        this.description=article.description;
        this.category=article.category;
        this.previewImage=article.image;
        this.isEdit=true;
        this.err=false;
      },
     //onchange image url changing into base 64//
    uploadImage(e)
    {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    }

  },
   computed:{
      articles(){
        let data=this.$store.getters.ARTICLES;
        let url_param = this.$route.params.name;
        console.log(this.$route.params.name)
        if(url_param=="Innovation" || url_param=="Photography" || url_param=="Education" || url_param=="Writing" || url_param=="Food" || url_param=="Health" || url_param=="Movies" || url_param=="Science" || url_param=="Technology")
        {
          return data.filter(el=>{
          return el.category==url_param;
           });
           console.log('newArray',articles);
        }
        if (url_param === undefined) 
        {
           return  data;
         }
      }, 
      active_li()
      {
        return this.$route.params.name;
      } 
    },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a
  {
    cursor: pointer;
  }
  .cut-text 
  { 
    text-overflow: ellipsis;
    overflow: hidden; 
    width:460px; 
    white-space: nowrap;
  }
  .row
  {
    margin:0px;
  }
  .article
  {
    margin-bottom:80px;
  }
  .article-image
  {
  	width: 20%;
  }
  .categories
  {
    margin-top:40px;
  	text-align:left;
    margin-left:10px;
     
  } 
  .categories ul
  {
    list-style: none;
  }
  .links
  {
    text-decoration:none;
    font-weight:400;
    padding: 5px;
    margin-bottom: 2px; 
    color: #4e4848;
  }
  .links:hover
  {

    background-color:#dfeab887;
  }
  .links a
  {
    text-decoration: none;
    color:black;
    padding: 5px;
  }

  
  .images-of-artilces
  {
    width:150px;
    height:150px;
    float: right;
    margin-top:30px;
     
  }
  .articles-list
  {
    margin:10px;
  }
  .article-title
  {
    font-weight:700;
    color:#286873;
    text-transform: capitalize;
  }
   
  .breadcrumbs
  {
    background-color: white;
    margin-left: 50px;
  }
  .active_color
  {
    font-weight: bold;
  }
  .category-name
  {
    font-weight: bold;  
    margin-top: 40px;
    padding-top:10px;
  }
  .category-name .card-body
  {
    padding:0px 20px 0px 20px;
  }
  /*.articles-block {
      margin-bottom: 4%;
  }*/
</style>
