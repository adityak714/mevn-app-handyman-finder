<template>
      <div class="content" >
        <div class = "col-12 title-container">
          <p class="title" v-if="this.profession !== ''">All {{profession}}s at {{area}}</p>
          <p class="title" v-else>All handymen in {{area}}</p>
        </div>
        <div class="col-12 message-container" v-if="handymen.length === 0">
          <p class="message">No handymen found</p>
        </div>
        <b-col cols = "12" cards>
          <b-row class = "card-row" v-for="handyman in handymen" :key="handyman._id">
              <Handyman :handyman="handyman" />
          </b-row>
        </b-col>
      </div>
</template>
<script>
import Handyman from '../components/Handyman.vue'
export default {
  data() {
    return {
      id: ''
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
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  /*padding-top: 50px;*/
  background-color: white;
  min-height: 1000px;
  height: 100%;
}

.area-location{
  width: 300px;
}

.title{
  font-size: 50px;
}

.cards {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-row {
  display: flex;
  justify-content: center;
}
</style>
