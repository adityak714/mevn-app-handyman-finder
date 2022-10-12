<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <b-row>
        <b-col col="12">
         <div class="header-container">
            <Header :firstName="firstName" :lastName='lastName' v-on:findHandy="(bool) => this.isFind = bool"/>
         </div>
        </b-col>
    </b-row>
    <b-row>
    <b-container fluid >
        <div class="main-container" >
        <b-col cols="12">
            <b-container fluid class="content" v-show="isFind">
                <p class="title">Find Handymen</p>
                <label for="area">Area/Location</label>
                <b-form-select size="sm" class="mt-3" :options="area_options" v-model="area"></b-form-select>
                <b-container fluid id='rendered-map'><Gmap v-if="area !== null" :region="area"/></b-container>
                <div>
                <b-form-select v-model="profession" :options="options" size="sm" class="mt-3"></b-form-select>
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
      profession: '',
      area: null,
      options: [
        { value: '', text: '- All Categories -' },
        { value: 'Architect', text: 'Architect' },
        { value: 'Plumber', text: 'Plumber' },
        { value: 'Electrician', text: 'Electrician' },
        { value: 'Carpenter', text: 'Carpenter' }
      ],
      area_options: [
        { value: null, text: '- Filter Area -' },
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
min-height: 1000px;
height: 100%;
align-items: flex-start;
}
.header-container{
border:#9D5100
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
margin-left: 5px;
margin-right: 5px;
}
.mt-3{
width: 300px;
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
