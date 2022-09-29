<template>
        <!----- Header -->
    <b-container fluid>
    <div class="home-page">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
        <b-row>
            <b-col col="12">
             <div class="header-container">
                <ClientHeader/>
             </div>
    </b-col>
   </b-row>
   <b-row>
    <b-container fluid>
    <div class="main-container">
        <b-col cols="9">
                <b-container fluid class="content">
                    <p>Find Handyman</p>
                        <div>
                            <label for="area">Area/Location</label>
                        </div>
                        <div>
                            <b-form-input size="sm" class="mt-3" v-model="text" placeholder="Enter your name"></b-form-input>
                            <div class="mt-2">Value: {{ text }}</div>
                        </div>
                    <div>
                    <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                    </div>
                    <div>
                        <label for="range-2">Price Level 0- 500 (SEK/hr)</label>
                    </div>
                    <div>
                        <b-form-input class="mt-3" id="range-2" v-model="priceValue" type="range" min="0" max="500" step="10"></b-form-input>
                        <div>{{ priceValue}}</div>
                    </div>
                </b-container>
        </b-col>
   </div>
   </b-container>
   </b-row>
</div>
</b-container>
</template>
<script>
import ClientHeader from '@/components/ClientHeader.vue'
export default {
  data() {
    return {
      selected: null,
      priceValue: 0,
      occupation: '',
      text: '',
      options: [
        { value: null, text: 'Please select an occupation' },
        { value: 'Architect', text: 'Architect' },
        { value: 'Plumber', text: 'Plumber' },
        { value: 'Electrician', text: 'Electrician' }
      ]
    }
  },
  name: 'ClientHomePage',
  components: {
    ClientHeader
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
  background-color: #FFFFFF;
  height: 1000px;
}
.sidebar{
    display:flex;
    align-content: center;
    justify-content: center;
    background-color:rgba(222, 116, 9, 0.4);
    height: 800px
}
.header-container{
    border:#9D5100
}
.content{
    align-items: center;
    padding-top: 50px;
    background-color: white;
    height: 480px;
    border:solid
}
.mt-3{
    width: 500px;
}
</style>
