<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <b-row>
        <b-col col="12">
         <div class="header-container">
            <Header :firstName="firstName" :lastName='lastName' :isHandyman="isHandy" v-on:findHandy="(bool) => this.isFind = bool"/>
         </div>
        </b-col>
    </b-row>
    <b-row>
    <b-container fluid >
        <div class="main-container" >
        <b-col cols="12">
            <b-container fluid class="content" v-show="isFind">
                <b-row class = "first-container">
                  <p class="title">Find Handymen</p>
                <label for="area">Optionally filter by Area/Location</label>
                </b-row>
                <b-row>
                  <b-col cols = "12">
                    <b-form-select size="sm" class="filter" :options="area_options" v-model="area"></b-form-select>
                  </b-col>
                  <b-col cols = "12">
                    <b-container fluid id='rendered-map'><Gmap v-if="area !== ''" :region="area"/></b-container>
                  </b-col>
                </b-row>
                <div>
                <b-form-input v-model="profession" size="sm" class="filter" placeholder="Profession"></b-form-input>
                </div>
                <div>
                    <b-button @click="showHandymen" class="button">Find</b-button>
                    <b-modal id="field-empty" title="Incomplete">
                        <p class="my-4">Please fill in all fields</p>
                   </b-modal>
                   <b-modal id="no-handymen-found" title="No handymen">
                        <p class="my-4">No {{profession}} handymen found in the specified location </p>
                   </b-modal>
                </div>
            </b-container>
            <HandymenList v-show="!isFind" :handymen="handymen" :profession="profession" :area="area"/>
    </b-col>
    </div>
</b-container>
</b-row>
</div>
</template>

<script>

import Gmap from '../components/Gmap.vue'
import { Api } from '../Api.js'
import Header from '../components/ClientHeader.vue'
import HandymenList from '../components/HandymenList.vue'

export default {
  data() {
    return {
      isFind: true,
      isHandy: Boolean,
      profession: '',
      userId: '',
      firstName: '',
      lastName: '',
      area: '',
      area_options: [
        { value: '', text: '- Filter Area -' },
        { value: 'Västra Götaland', text: 'Västra Götaland' },
        { value: 'Stockholms Län', text: 'Stockholms Län' },
        { value: 'Skåne Län', text: 'Skåne' },
        { value: 'Hallands Län', text: 'Hallands Län' },
        { value: 'Jönköpings Län', text: 'Jönköpings Län' },
        { value: 'Uppsala Län', text: 'Uppsala Län' }
      ],
      handymen: []
    }
  },
  name: 'ClientHomePage',
  components: {
    Header,
    HandymenList,
    Gmap
  },
  created() {
    if (localStorage.getItem('token') === null && localStorage.getItem('user') === null) {
      this.$router.push('/login')
    }
  },
  methods: {
    showHandymen() {
      if (this.profession === null || this.area === null) {
        this.$bvModal.show('field-empty')
      } else {
        Api.get(`/handymen?profession=${this.profession}&area=${this.area}`)
          .then(response => {
            this.handymen = response.data
          }
          ).catch((err) => {
            if (err.response.status === 500) {
              this.$bvModal.show('no-handymen-found')
            } else {
              console.log(err)
            }
          })
        this.isFind = !this.isFind
      }
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
              this.isHandy = true
            })
            .catch(error => {
              this.firstname = error
            })
        }
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.isHandy = false
      })
      .catch(error => {
        this.firstname = error
      })
  }
}
</script>

<style scoped>
.material-symbols-outlined {
display: block;
padding-top: 10px;
}
.main-container {
display: flex;
background-image: url('../../assets/electricianpic.jpg');
min-height: 1000px;
height: 100%;
align-items: flex-start;
}
.header-container{
border:#9D5100
}

.first-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

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
}
.filter{
width: 200px;
text-align: start;
padding-bottom: 5px;
}
.area-location{
width: 300px;
}
.title{
font-size: 50px;
padding-top: 30px;
}
.button{
    width: 100px;
    margin-top: 20px;
    background-color: rgba(100, 0, 0, 0.4);
}
.range{
  margin-top: 30px;
}
</style>
