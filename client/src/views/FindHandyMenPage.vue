<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <b-row>
        <b-col col="12">
         <div class="header-container">
            <Header />
         </div>
        </b-col>
    </b-row>
    <b-row>
    <b-container fluid >
        <div class="main-container" >
        <b-col cols="12">
            <b-container fluid class="content" v-show="isFind">
                <p class="title">Find Handymen</p>
<<<<<<< HEAD
                <label for="area">Area/Location</label>
                <b-form-select size="sm" class="mt-3" :options="area_options" v-model="area"></b-form-select>
                <b-container fluid id='rendered-map'><Gmap v-if="area !== null" :region="area"/></b-container>
                <div>
                <b-form-select v-model="profession" :options="options" size="sm" class="mt-3"></b-form-select>
                </div>
                <div class="range">
=======
                <div>
                    <label for="area">Area/Location</label>
                </div>
                <b-form-input size="sm" class="area-location" v-model="text" placeholder="Enter the location"></b-form-input>
                <div>
                <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                </div>
                <div>
>>>>>>> d2a68ecab94b987a8e28c34cb44cfbb4a35ce897
                    <label for="range-2">Price Level 0- 500 (SEK/hr)</label>
                </div>
                <div>
                    <b-form-input class="mt-3" id="range-2" v-model="priceValue" type="range" min="0" max="500" step="10"></b-form-input>
                    <div>{{ priceValue}}</div>
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
<<<<<<< HEAD

import Gmap from '../components/Gmap.vue'
import { Api } from '../Api.js'
import Header from '../components/ClientHeader.vue'
import HandymenList from '../components/HandymenList.vue'

export default {
  data() {
    return {
      isFind: true,
      profession: '',
      area: null,
=======
import Header from '../components/Header.vue'
export default {
  data() {
    return {
      selected: null,
>>>>>>> d2a68ecab94b987a8e28c34cb44cfbb4a35ce897
      priceValue: 0,
      occupation: '',
      text: '',
      options: [
        { value: '', text: 'All' },
        { value: 'Architect', text: 'Architect' },
        { value: 'Plumber', text: 'Plumber' },
<<<<<<< HEAD
        { value: 'Electrician', text: 'Electrician' },
        { value: 'Carpenter', text: 'Carpenter' }
      ],
      area_options: [
        { value: null, text: 'Please select an area' },
        { value: 'Västra Götaland', text: 'Västra Götaland' },
        { value: 'Stockholms Län', text: 'Stockholms Län' },
        { value: 'Skåne Län', text: 'Skåne' },
        { value: 'Hallands Län', text: 'Hallands Län' },
        { value: 'Jönköpings Län', text: 'Jönköpings Län' },
        { value: 'Uppsala Län', text: 'Uppsala Län' }
      ],
      handymen: []
=======
        { value: 'Electrician', text: 'Electrician' }
      ]
>>>>>>> d2a68ecab94b987a8e28c34cb44cfbb4a35ce897
    }
  },
  name: 'ClientHomePage',
  components: {
<<<<<<< HEAD
    Header,
    HandymenList,
    Gmap
  },
  methods: {
    showHandymen() {
      if (this.profession === null || this.area === null) {
        this.$bvModal.show('field-empty')
      } else {
        Api.get(`/handymen?profession=${this.profession}`)
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
=======
    Header
>>>>>>> d2a68ecab94b987a8e28c34cb44cfbb4a35ce897
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
background-color: rgba(100, 0, 0, 0.4);
<<<<<<< HEAD
min-height: 1000px;
height: 100%;
align-items: flex-start;
=======
height: 1000px;
align-items: center;
>>>>>>> d2a68ecab94b987a8e28c34cb44cfbb4a35ce897
}
.header-container{
border:#9D5100
}
.content{
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
/*padding-top: 50px;*/
background-color: white;
<<<<<<< HEAD
height: 100%;
padding-top: 10px;
margin-left: 5px;
margin-right: 5px;
=======
height: 480px;
border:solid
>>>>>>> d2a68ecab94b987a8e28c34cb44cfbb4a35ce897
}
.mt-3{
width: 300px;
}
.area-location{
width: 300px;
}
.title{
font-size: 50px;
}
.button{
    width: 100px;
    background-color: rgba(100, 0, 0, 0.4);
}
</style>
