<template>
  <HelloWorld />
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
  	mounted(){
  		document.title="Articles"
  	},
    components: {
      HelloWorld
    }
  }
</script>
