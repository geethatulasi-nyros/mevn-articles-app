<template>
  <div id="app">
    <div id="nav">
      <Header/>
    </div>
      <router-view/>
      <Footer/>
  </div>
</template>


<script>
import HelloWorld from './components/HelloWorld'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
              Header,
              Footer
  },
  data () {
    return {
      
    }
  }
}
</script>
