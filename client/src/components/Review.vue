<template>
  <b-container fluid >
    <b-row>
      <b-col sm="3" md="3" lg="3">
        <label><b-icon icon="person-fill"></b-icon> <strong>Reviewer: </strong></label>
      </b-col>
      <b-col sm="6" md="9" lg="9">
        <p>{{this.reviewer}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3" md="3">
          <label><strong>Rating: </strong></label>
      </b-col>
      <b-col sm="6" md="9">
        <b-form-rating readonly v-model="finalRating" variant="warning" b></b-form-rating>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col sm="3" md="3">
        <label><strong>Description: </strong></label>
      </b-col>
      <b-col sm="6" md="9">
        <p>{{review.comment}}</p>
      </b-col>
      <hr style="width: 80%; border-width: 3px;">
    </b-row>
    <!----
    <b-card no-body class="overflow-hidden">
      <b-col cols="12" class = "card">
        <b-row no-gutters class = "card-container">
          <b-row class="first-row">
            <b-col cols="6" class="date-request">
              <div class = "handyman-name">
                <label>Rating: </label>
                <b-form-rating size="sm" class="rating" v-model="finalRating" variant="warning" readonly></b-form-rating>
              </div>
            </b-col>
            <b-col cols="6" class="job-request">
              <div class = "handyman-name">
                <label>Comment: </label>
                <strong>{{review.comment}}</strong>
              </div>
            </b-col>
          </b-row>
        </b-row>
      </b-col>
    </b-card>
     ------->
  </b-container>
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
import { Api } from '../Api'

export default {
  name: 'Review',
  data() {
    return {
      finalRating: this.review.rating,
      reviewer: ''
    }
  },
  props: {
    review: Object,
    clientName: String
  },
  created() {
    Api.get(`/clients/${this.review.sender}`).then((response) => {
      this.reviewer = `${response.data.firstName} ${response.data.lastName}`
    }).catch((err) => {
      console.log(err)
    })
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
.make-container .container-fluid {
  padding-top: 20px;
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
