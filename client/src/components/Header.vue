<template>
	<div class="header">
	<b-container>
	 <div class="title">
	<h4>Articles</h4>
	 </div>
  	<b-nav pills v-if="this.$route.name == 'articles'" show class="nav">
	<b-nav-item active to="/createarticle" class="nav-item"><span>Create Article</span></b-nav-item> 
	 </b-nav>
	</b-container>
	</div>
</template>
 <script>
 export default{
 	data()
 	{
 		 
 	},
 	mounted()
 	{
 	}
 }
 </script>


<style>
	.header
	{
			background-color:#BFB65E;
			width: 100%;
			height: 80px;
			margin-top:0;
			padding: 10px;
	}
	.nav-item
	{
		background-color:#9470AD;
	}
	.nav
	{
		float: right;
		width:20%;
	}
	.title
	{
		float: left;
		width:80%;
	}
 
</style>