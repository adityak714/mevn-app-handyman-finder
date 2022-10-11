<!--To be likely deleted -->
<template>
  <div>
    <h1>Hello {{ firstname }} {{id}}</h1>
    <button @click = "click">Click Me</button>
  </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'ProfilePage',
  data() {
    return {
      firstname: '',
      lastname: '',
      id: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
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
        this.firstname = response.data.firstName
      })
      .catch(error => {
        this.firstname = error
      })
  }
}

/*
  mounted() {
    Api.get('/client', { headers: { token: localStorage.getItem('token') } })
      .then(function (res) {
        this.firstname = res.data.firstname
        this.lastname = res.data.lastname
      })
  },
  */

/*
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
    */

// .then((res) => {
//    this.clients = res.data.email
//  }).catch((err) => {
//    console.log(err)
//  })

</script>

<style>

</style>
