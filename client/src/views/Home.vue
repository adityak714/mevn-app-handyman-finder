<template>
  <div class='home-page'>
    <Header :userId='userId' :firstName='firstName' :lastName='lastName' :isHandyman='isHandy'/>
    <div id="body">
      <h1 class="display-3">Welcome {{ firstName }} {{ lastName }}</h1>
        <br/>
      <h2>Profile Page </h2>
      <h3 class="profile-info">
        <hr style="width: 50%; border-width: 5px;">
        First Name: {{firstName}} <br/>
        Last Name: {{lastName}} <br/>
        Phone Number: {{phoneNumber}} <br/>
        {{isHandy ? 'Area:' : 'Address:'}} {{ isHandy ? area : address }}
        <h3 class="profile-info" v-if="isHandy"> Profession: {{profession}} </h3>
      </h3>
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
      area: '',
      isHandy: Boolean,
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
    if (localStorage.getItem('token') === null || localStorage.getItem('user') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
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
              this.area = response.data.area
              this.profession = response.data.profession
              this.isHandy = true
            })
            .catch(error => {
              this.firstname = error
            })
        }
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.phoneNumber = response.data.phoneNumber
        this.address = response.data.address
        this.isHandy = false
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
  background-image: url('../../assets/electricianpic.jpg');
  background-size: cover;
  height: 1000px;
  width: 100%;
}

.display-3 {
 display: flex;
 justify-content: center;
 font-size: 3vw;
}

h2, .profile-info {
  font-size: 2vw;
}

@media only screen and (max-width: 650px) {
  .display-3 {
    font-size: 6vw;
  }

  h2, .profile-info {
    font-size: 3vw;
  }
}

html {
  width: 100%;
  height: 100%;
}

</style>
