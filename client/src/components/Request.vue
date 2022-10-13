<template>
  <div>
    <b-card no-body class="overflow-hidden card">
      <b-row no-gutters class = "card-container">
          <b-row class = "card-content">
            <b-col cols = "12" class="first-row card-row">
              <strong>Date: oscar</strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols = "12" class="first-row card-row">
              <strong>Description: oscar}</strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols = "12" class="first-row card-row">
              <strong>Status: oscar</strong>
            </b-col>
          </b-row>
      </b-row>
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

.handyman-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-content {
  width: 100%;
}

.modal-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.card-row {
  max-height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
}

.card-image {
  height: 70px;
  width: 70px;
  margin-left: 10px;
}

.left-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.title-container {
  display: flex;
  justify-content: flex-start;
  align-content: center;
}

.right-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.title{
  font-size: 30px;
}
#job {
  width: 100%
}

.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
