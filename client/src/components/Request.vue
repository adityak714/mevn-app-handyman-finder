<template>
  <div>
    <div>
      <b-container no-body class="overflow-hidden card">
          <b-row class = "card-container">
            <b-col cols = "12">
              <b-row class = "first-row row">
                <strong>Date: {{ request.date }}</strong>
              </b-row>
              <b-row class = "first-row row">
                <strong>Description: {{ request.description }}</strong>
              </b-row>
              <b-row class = "first-row row">
                <b-col cols = "12" class="first-row card-row">
                  <strong>Status: {{ request.status }}</strong>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </b-container>
    </div>
  </div>

  <!--
  <div>
    <b-card no-body class="overflow-hidden card">
      <b-row no-gutters class = "card-container">
          <b-row class = "card-content">
            <b-col cols = "12" class="first-row card-row">
              <strong>Date: {{ request.date }}</strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols = "12" class="first-row card-row">
              <strong>Description: {{ request.description }}</strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols = "12" class="first-row card-row">
              <strong>Status: {{ request.status }}</strong>
            </b-col>
          </b-row>
      </b-row>
    </b-card>
  </div>

    <div class = "row card-content">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <div class = "col-2 left-card">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="card-image rounded-0"></b-card-img>
            </div>
        <div class = "col-10 right-card">
            <div class = "col-6 request-information">
              <div class = "handyman-name">
                <strong>Date: {{request.date}}</strong>
              </div>
              <div class = "handyman-profession">
                <strong>Address: {{request.address}}</strong>
              </div>
              <div class = "handyman-profession">
                <strong>Description: {{request.description}}</strong>
              </div>
            </div>
            <div class = "col-6 create-request-button">
                <b-button  variant="outline-primary">Edit request</b-button>
            </div>
        </div>
    </div>
    ---->
</template>
<script>
export default {
  name: 'Request',
  props: {
    request: Object
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
