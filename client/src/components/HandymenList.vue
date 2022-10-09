<template>
      <div class="content" >
        <div class = "col-12 title-container">
          <p class="title">List of {{profession}}s at {{area}}</p>
        </div>
        <div class="col-12 cards">
          <div class = "card" v-for="handyman in handymen" :key="handyman._id">
            <Handyman :handyman="handyman" />
            </div>
        </div>
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
.card {
  height: 230px;
  width: 900px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.2s
}
.card:hover{
  cursor: pointer;
  border: 2px rgba(157, 81, 0, 1)
}
.text {
  display:flex;
}
.class-text-button{
  display:flex;
  justify-content:flex-start;
  width:100%
}

.card {
  height: 100px;
}

.left-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.right-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card-image {
  height: 80px;
  width: 80px;
  border-radius: 30px;
}

.card-content {
  height: 100%;
}

.handyman-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.create-request-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
