<template>
      <div class="content" >
        <div class = "col-12 title-container">
          <p class="title">List of {{occupation}}s at {{area}}</p>
        </div>
        <div class="col-12 cards">
          <div class = "card" v-for="handyman in handymen" :key="handyman._id">
            <div class = "row card-content">
              <div class = "col-2 left-card">
                <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="card-image rounded-0"></b-card-img>
              </div>
              <div class = "col-10 right-card">
                <div class = "col-6 handyman-information">
                    <div class = "handyman-name">
                      {{handyman.firstName}} {{handyman.lastName}}
                    </div>
                    <div class = "handyman-profession">
                      {{handyman.occupation}}
                    </div>
                </div>
                <div class = "col-6 create-request-button">
                  <b-button variant="outline-primary">Button</b-button>
                </div>
              </div>
            </div>
        </div>

          <!--
          <b-card no-body class="overflow-hidden" style="max-width: 100%;">
            <b-row no-gutters>
              <b-col md="3">
                <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="9">
                <b-card-body >
                  <div class="card-text-button">
                    <b-card-text>
                    <p class="text">Name: {{handyman.firstName}} {{handyman.lastName}}</p>
                    <p class="text">Profession: {{handyman.occupation}}</p>
                  </b-card-text>
                    <b-button>Create request</b-button>
                  </div>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          -->
        </div>
      </div>
    <!-- Header
                <b-container fluid class="content">
                <div>
                 <a href="/home"><b-button>Go to home</b-button></a>
                </div>
                </b-container>
              -->
</template>
<script>
// import Button from '../components/Button.vue'
export default {
  data() {
    return {
      images: [
        {
          id: 'Architect',
          source: '../assets/architectpic.jpg'
        },
        {
          id: 'Plumber',
          source: '../assets/plumberpic.jpg'
        },
        {
          id: 'Electrician',
          source: '../assets/electricianpic.jpg'
        }
      ]
    }
  },
  name: 'HandymanList',
  props: {
    handymen: Array,
    occupation: String,
    area: String
  },
  methods: {
    getHandymanPic(value) {
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].id === value) {
          return this.images[i].source
        }
      }
    }
  },
  components: {
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
