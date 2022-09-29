<template>
  <div class='home-page'>
    <Header/>
    <div id="body">
      <h1 class="display-3">DIT342 Frontend</h1>
      <p class="lead">Welcome to your DIT342 Frontend Vue.js App</p>
      <button type="button" class="btn btn_message btn-primary">Get Message from Server</button>
      <p>Message from the server:<br> none</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Header from '../components/Header.vue'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  components: {
    Header
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>
.btn_message {
  margin-bottom: 1em;
}

div#body {
  padding-top: 50px;
  background-color: rgba(100, 0, 0, 0.4);
  height: 1000px;
}
</style>
