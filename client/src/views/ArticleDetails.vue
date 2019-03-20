<template>
	<div>
		<b-breadcrumb :items="links" class="breadcrumbs" />
		<h3 class="text-center">Article Details</h3>
		<b-card class="single-article">
			<div class="text">
			<b-card-text :style="{fontSize:18+'px',fontWeight:400,color:'gray'}">{{articledata.category}}
			</b-card-text>
		 	<b-card-text class="single-article-title">
		 	{{articledata.title}}
		 	</b-card-text>
			<b-card-text>
			{{articledata.description}}
			</b-card-text>
			</div>
			<b-card-img class="single-article-image" :src="articledata.image"/>
		</b-card>

	</div>
</template>

<script>
	export default{
		data(){
			 
			return{
			 articledata:[],
			 links: [
		          {
		            text: 'Home',
		            to: '/'
		          },
		           
		          {
		          text:'',
		            active: true
		          }
		        ],
       		  
			}
		},
		mounted()
		{
			document.title="Articles";
			let data={id:this.$route.params.id}
			console.log(data);
			console.log(this.$route);
			this.$store.dispatch("GET_ARTICLE",data).then((res)=>{
			console.log("response in article component",res.data);
			this.articledata=res.data;
			this.links[1].text = res.data.title;
		});
		},
		computed:{
		}
	}
</script>

<style scoped>
	.single-article
	{
		margin:30px auto;
		width: 50%;
		margin-bottom:80px;
	}
	 .single-article-image
	{
		width:300;
		height:300;
		 margin:auto;
	}
	.breadcrumbs
	{
	  	background-color: white;
	  	margin-left: 50px;
	}
	.single-article-title
	{
	  	font-weight:800;
	  	font-size: 20px;
	  	color:#5B7450;
	  	text-transform: capitalize;
	}
</style>