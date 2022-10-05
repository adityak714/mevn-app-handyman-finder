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
                <label for="area">Area/Location</label>
                <b-form-select size="sm" class="mt-3" :options="area_options" v-model="area"></b-form-select>
                <div>
                <b-form-select v-model="occupation" :options="options" size="sm" class="mt-3"></b-form-select>
                </div>
                <div class="range">
                    <label for="range-2">Price Level 0- 500 (SEK/hr)</label>
                </div>
                <div>
                    <b-form-input class="mt-3" id="range-2" v-model="priceValue" type="range" min="0" max="500" step="10"></b-form-input>
                    <div>{{priceValue}}</div>
                </div>
                <div>
                    <b-button @click="showHandymen" class="button">Find</b-button>
                </div>
            </b-container>
            <HandymenList v-show="!isFind" :handymen="handymen" :occupation="occupation" :area="area"/>
    </b-col>
    </div>
</b-container>
</b-row>
</div>
</template>
<script>
import Header from '../components/Header.vue'
import HandymenList from '../components/HandymenList.vue'
// import HandymenList from '../components/HandymenList.vue'
export default {
  data() {
    return {
      isFind: true,
      occupation: null,
      area: null,
      priceValue: 0,
      options: [
        { value: null, text: 'Please select an occupation' },
        { value: 'Architect', text: 'Architect' },
        { value: 'Plumber', text: 'Plumber' },
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
      handymen: [
        {
          _id: 1,
          firstName: 'James',
          lastName: 'Bond',
          email: 'james.bond@gmail.com',
          location: 'Skåne',
          occupation: 'Plumber'
        },
        {
          _id: 2,
          firstName: 'David',
          lastName: 'James',
          email: 'jamesD@gmail.com',
          location: 'Lindholmen',
          occupation: 'Architect'
        },
        {
          _id: 3,
          firstName: 'David',
          lastName: 'James',
          email: 'jamesD@gmail.com',
          location: 'Lindholmen',
          occupation: 'Architect'
        },
        {
          _id: 4,
          firstName: 'David',
          lastName: 'James',
          email: 'jamesD@gmail.com',
          location: 'Lindholmen',
          occupation: 'Architect'
        }
      ]
    }
  },
  name: 'ClientHomePage',
  components: {
    Header,
    HandymenList
  },
  methods: {
    showHandymen() {
      this.isFind = !this.isFind
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
/*padding-top: 50px;*/
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
