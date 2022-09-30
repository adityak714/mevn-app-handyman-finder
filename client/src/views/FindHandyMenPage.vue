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
    <b-container fluid>
        <div class="main-container">
        <b-col cols="12">
            <b-container fluid class="content">
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
                    <div>{{ priceValue}}</div>
                </div>
                <div>
                    <b-button class="button">Find</b-button>
                </div>
            </b-container>
    </b-col>
</div>
</b-container>
</b-row>
</div>
</template>
<script>
import Header from '../components/Header.vue'
export default {
  data() {
    return {
      occupation: null,
      area: null,
      priceValue: 0,
      options: [
        { value: null, text: 'Please select an occupation' },
        { value: 'Architect', text: 'Architect' },
        { value: 'Plumber', text: 'Plumber' },
        { value: 'Electrician', text: 'Electrician' }
      ],
      area_options: [
        { value: null, text: 'Please select an area' },
        { value: 'Lindholmen', text: 'Lindholmen' },
        { value: 'Torslanda', text: 'Torslanda' },
        { value: 'Sannegården', text: 'Sannegården' },
        { value: 'Lundbyvassen', text: 'Lundbyvassen' },
        { value: 'Tingstadsvassen', text: 'Tingstadsvassen' },
        { value: 'Lillhagen-Brunnsbo', text: 'Lillhagen-Brunnsbo' },
        { value: 'Lorensberg', text: 'Lorensberg' },
        { value: 'Heden', text: 'Heden' },
        { value: 'Lunden', text: 'Lunden' },
        { value: 'Gamlestaden', text: 'Gamlestaden' },
        { value: 'Inom Vallgraven', text: 'Inom Vallgraven' },
        { value: 'Haga', text: 'Haga' },
        { value: 'Solängen', text: 'Solängen' },
        { value: 'Guldheden', text: 'Guldheden' },
        { value: 'Annedal', text: 'Annedal' }
      ]
    }
  },
  name: 'ClientHomePage',
  components: {
    Header
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
height: 1000px;
align-items: center;
}
.sidebar{
display:flex;
align-content: center;
justify-content: center;
background-color:rgba(222, 116, 9, 0.4);
height:1000px
}
.header-container{
border:#9D5100
}
.content{
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
/*padding-top: 50px;*/
background-color: white;
height: 480px;
border:solid
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
.range{
  margin-top: 10px;
}
</style>
