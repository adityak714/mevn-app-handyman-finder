<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <b-col cols="12" class = "card">
        <b-row no-gutters class = "card-container">

          <b-row class="first-row">
            <b-col cols="6" class="date-request">
              <div class = "handyman-name">
                <strong>Date: {{request.date}}</strong>
              </div>
            </b-col>
            <b-col cols="6" class="job-request">
              <div class = "handyman-name">
                <strong>Job: {{request.job}}</strong>
              </div>
            </b-col>
          </b-row>
          <b-row class="second-row">
            <b-col cols="12" class="description-request">
              <div class = "handyman-name">
                <strong>Description: {{request.description}}</strong>
              </div>
            </b-col>
          </b-row>
          <b-row class="third-row">
            <b-col cols="12" class="description-request">
            </b-col>
          </b-row>
        </b-row>
      </b-col>
    </b-card>
  </div>
  <!----
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
.left-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.card-container {
  width: 100%;
}
.right-card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.request-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Open Sans", sans-serif;
}
.card-image {
  height: 80px;
  width: 80px;
  border-radius: 30px;
}
.card-content {
    height: 100%;
}

.card {
  min-height: 100px;
  height: 100%;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>
