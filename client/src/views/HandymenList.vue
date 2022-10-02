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
                <p class="title">HandyMan List</p>
                <div>
                  <b-card bg-variant="dark" text-variant="white" title="Card Title">
                      <b-card-text>
                      With supporting text below as a natural lead-in to additional content.
                      </b-card-text>
                   <b-button href="#" variant="primary">Go somewhere</b-button>
                    </b-card>
                    <b-card bg-variant="dark" text-variant="white" title="Card Title">
                      <b-card-text>
                      With supporting text below as a natural lead-in to additional content.
                      </b-card-text>
                   <b-button href="#" variant="primary">Go somewhere</b-button>
                    </b-card>
                    <b-card bg-variant="dark" text-variant="white" title="Card Title">
                      <b-card-text>
                      With supporting text below as a natural lead-in to additional content.
                      </b-card-text>
                   <b-button href="#" variant="primary">Go somewhere</b-button>
                    </b-card>
                </div>
            </b-container>
    </b-col>
</div>
</b-container>
</b-row>
</div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  data() {
    return {
    }
  },
  name: 'HandymanList',
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
