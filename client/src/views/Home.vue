<template>
  <div class='home-page'>
    <Header :userId='userId' :firstName='firstName' :lastName='lastName' :isHandyman='isHandy'/>
    <div id="body">
      <b-row>
        <b-col cols = "12" class = "container">
          <b-container fluid class="content">
              <p class="title">Welcome {{ firstName }}</p>
              <PieChart v-if="dataloaded" :userId='userId' :isHandyman='isHandy' />
          </b-container>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Header from '../components/ClientHeader.vue'
import PieChart from '../components/Pie.vue'

export default {
  name: 'home',
  data() {
    return {
      dataloaded: false,
      message: 'none',
      userId: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      area: '',
      isHandy: false,
      profession: null
    }
  },
  components: {
    Header,
    PieChart
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
    const searchURL = new URL(window.location).pathname
    const strs = searchURL.split('/')
    const id = strs.at(-1)
    this.userId = id
    Api.get(`/clients/${this.userId}`)
      .then(response => {
        if (response.data === 'No such client exists!') {
          Api.get(`/handymen/${this.userId}`)
            .then(response => {
              this.firstName = response.data.firstName
              this.lastName = response.data.lastName
              this.phoneNumber = response.data.phoneNumber
              this.area = response.data.area
              this.profession = response.data.profession
              this.isHandy = true
              this.dataloaded = true
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.firstName = response.data.firstName
          this.lastName = response.data.lastName
          this.phoneNumber = response.data.phoneNumber
          this.address = response.data.address
          this.isHandy = false
          this.dataloaded = true
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.content{
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
margin-top: 50px;
padding-bottom: 30px;
background-color: white;
height: 100%;
padding-top: 10px;
margin-left: 10px;
margin-right: 10px;
max-width: 800px;
max-height: 600px;
border-radius: 20px;
}

div#body {
  padding-top: 50px;
  background-image: url('../../assets/electricianpic.jpg');
  background-size: cover;
  height: 1000px;
  width: 100%;
}

.container {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 30px;
  padding-top: 30px;
}
</style>
