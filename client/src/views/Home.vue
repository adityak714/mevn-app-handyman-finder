<template>
  <div class='home-page'>
    <Header/>
    <div id="body">
      <h1 class="display-3">Welcome {{ firstName }} {{ lastName }}</h1>
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
      message: 'none',
      firstName: '',
      lastName: ''
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
  },
  created() {
    const searchURL = new URL(window.location).pathname
    const strs = searchURL.split('/')
    const id = strs.at(-1)
    console.log(id)
    this.id = id
    Api.get(`/clients/${id}`)
      .then(response => {
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
      })
      .catch(error => {
        this.firstname = error
      })
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

.display-3 {
 display: flex;
 justify-content: center;
}
</style>
