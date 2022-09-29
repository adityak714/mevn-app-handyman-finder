<template>
  <div>
    <Clients @sign-in=signIn v-bind:clients='clients'/>
    <h1>Hello {{firstname}}</h1>
  </div>
</template>

<script>
import { Api } from '../Api'
import Clients from '@/components/Clients.vue'

export default {
  name: 'ProfilePage',
  components: {
    Clients
  },
  data() {
    return {
      firstname: '',
      lastname: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  signIn() {
    // eslint-disable-next-line no-unused-vars
    const auth = { email: this.email, password: this.password }
    Api.post('/auth/signin', auth)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted() {
    Api.get('/client', { headers: { token: localStorage.getItem('token') } })
      .then(function (res) {
        this.firstname = res.data.firstname
        this.lastname = res.data.lastname
      })
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
    //  .then((res) => {
    //    this.clients = res.data.email
    //  }).catch((err) => {
    //    console.log(err)
    //  })
  }
}
</script>

<style>

</style>
