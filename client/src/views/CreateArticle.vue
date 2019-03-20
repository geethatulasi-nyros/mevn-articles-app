
<template>
	<div class="form">
	   
	    <b-breadcrumb :items="links" class="breadcrumbs" />
      <p class="text-center">
      {{msg}} 
      <span v-if="articlemsg==true" show :style="{color:'#217573',fontWeight:'bold'}">
      <router-link to="/">
      Home Page
      </router-link>
      </span>
      </p>
		  <b-container class="article-form">
        <b-form @submit.prevent="addArticle" class="form">
        <h3 class="text-center">Articles Form</h3>
        <label>Title</label>
        <b-input v-model="title" @keyup="validateTitle" placeholder="Title" :class="{error_style:title_error}" @keyup.enter="addArticle"/><br/>
        <label>Image</label>
        <img :src="previewImage" class="uploading-image" />
        <b-form-file type="file" accept="image/*" @change="uploadImage" v-model="file"/><br/><br/>
        <label>Categories</label>
        <b-select v-model="category" class="mb-3" :class="{error_style:category_error}" @change="validateCategory" @keyup.enter="addArticle">
          <option value="null">Please select an option</option>
          <option value="Innovation">Innovation</option>
          <option value="Education">Education</option>
          <option value="Photography">Photography</option>
          <option value="Writing">Writing</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Movies">Movies</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
         </b-select>  
         <br/>
         <label>Description</label>
          <b-textarea rows="4" placeholder="enter something" v-model="description" :class="{error_style:description_error}" @keyup="validateDescription" @keyup.enter="addArticle"/><br/>
          <b-button type="submit" variant="primary" size="sm">Submit</b-button>
        </b-form>
	    </b-container>
	</div>
</template>

<script>
export default {
   data(){
      return {
        title:'',
        category:null,
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
        file:null,
        articlemsg:false,
        links: [
            {
              text: 'Home',
              to: '/'
            },
             
            {
              text: 'Create Article',
              active: true
            }
        ]
      }
   },
   mounted(){
    document.title="Articles"
    this.category=this.$route.params.category;
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
    validateCategory(event){
      if(event === null)
      {
        this.category_error=true;
      }
      else{
        this.category_error=false;
      }
    },   
    //onchange feedback validation function//
    validateDescription(event){
      if(event.target.value === '')
      {
        this.description_error=true;
      }
      else{
        this.description_error=false;
      }
    },   
    //onsubmit validation on submitted input fields//
    validateSubmit(){
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
            if(res.status === "success" )
            {
               this.msg=res.message;
               this.articlemsg=true;
               this.title="";
               this.category=null;
               this.description="";
               this.previewImage="";
               this.file=null;
            }
          });
    	 }
    },
   	uploadImage(e){
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
        this.previewImage = e.target.result;
        console.log(this.previewImage);
    	};
    }
  }
}
</script>
    <style scoped>
 
 .article-form{
  width:50%;
  margin:70px auto;
  background-color:#C8D2D6;
  padding: 30px;
  border:1px solid black;
  border-radius: 4px;
  margin-top:20px;
 }
 .photo{
  margin-left: 30px;
 }
 .error_style{
  border-color:red;
  box-shadow:0px 0px 5px 2px red;
 }
  .uploading-image{
    width:25%;
    margin:0px 5px;
  }
  .article-image{
  	width: 20%;
  }
  .categories{
  	float:left;
  	width: 20%;
  }
  .form{
  	width:90%;
  	margin: auto;
  }
  label{
  	float: left;
  }
  h3{
  	color:#B2603A;
  	font-weight: 300;
  }
  .breadcrumbs{
  	background-color: white;
  	margin-left: 50px;
  }
</style>
