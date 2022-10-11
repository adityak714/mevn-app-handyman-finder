<template>
  <div id="app">
    <ClientHeader/>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
import ClientHeader from './components/ClientHeader.vue'

export default {
  components: [ClientHeader]
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
