<template>
    <div class="content" >
        <div class = "col-12 title-container">
            <p class="title">My Requests</p>
        </div>
        <div class="col-12 no-requests" v-if="requests.length === 0">
            <p class="message">No requests found</p>
        </div>
      <b-col cols = "12" class = "cards">
        <b-row class = "card-row" v-for="request in requests" :key="request._id">
          <b-col cols = "12">
            <Request :request="request" :isClient="isClient"/>
          </b-col>
        </b-row>
      </b-col>
    </div>
</template>
<script>
import Request from '../components/Request.vue'
export default {
  name: 'Requests',
  props: {
    requests: Array,
    isClient: Boolean
  },
  components: {
    Request
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
  padding-top: 30px;
justify-content: flex-start;
align-items: center;
/*padding-top: 50px;*/
background-color: white;
min-height: 1000px;
height: 100%;
}

.title{
font-size: 50px;
}

.cards {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
}

.card-row {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
