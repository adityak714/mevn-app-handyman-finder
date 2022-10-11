<template>
  <div class='home-page'>
    <Header :userId='userId' :firstName='firstName' :lastName='lastName'/>
    <div id="body">
      <h1 class="display-3">Welcome {{ firstName }} {{ lastName }}</h1>
        <br/>
      <h2>Profile Page</h2>
      <h3 class="profile-info">
        First Name: {{firstName}} <br/>
        Last Name: {{lastName}} <br/>
        Phone Number: {{phoneNumber}} <br/>
        Address: {{address}}
      </h3>
      <h5 v-show="profession !== null"> Profession: {{profession}} </h5>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Header from '../components/ClientHeader.vue'

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      userId: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      profession: null
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
    this.userId = id
    Api.get(`/clients/${id}`)
      .then(response => {
        if (response.data === 'No such client exists!') {
          Api.get(`/handymen/${id}`)
            .then(response => {
              this.firstName = response.data.firstName
              this.lastName = response.data.lastName
              this.phoneNumber = response.data.phoneNumber
              this.address = response.data.address
              this.profession = response.data.profession
            })
            .catch(error => {
              this.firstname = error
            })
        }
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.phoneNumber = response.data.phoneNumber
        this.address = response.data.address
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
  width: 100%;
}

.display-3 {
 display: flex;
 justify-content: center;
 font-size: 4vw;
}

.profile-info {
  font-size: 2vw;
}

html {
  width: 100%;
  height: 100%;
}

</style>
