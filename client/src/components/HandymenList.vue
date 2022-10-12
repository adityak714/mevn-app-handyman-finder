<template>
      <div class="content" >
        <div class = "col-12 title-container">
          <p class="title">List of {{profession}}s at {{area}}</p>
        </div>
        <b-row>
            <b-col cols = "12" class = "cards" v-for="handyman in handymen" :key="handyman._id">
              <Handyman :handyman="handyman" />
            </b-col>
        </b-row>
      </div>
</template>
<script>
import Handyman from '../components/Handyman.vue'
export default {
  data() {
    return {
    }
  },
  name: 'HandymanList',
  props: {
    handymen: Array,
    profession: String,
    area: String
  },
  components: {
    Handyman
  // Button
  }
}
</script>
<style scoped>
.material-symbols-outlined {
display: block;
padding-top: 10px;
}
.content{
/*padding-top: 50px;*/
background-color: white;
min-height: 1000px;
height: 100%;
width: 100%;
}

.title{
font-size: 50px;
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
