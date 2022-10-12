<template>
  <div>
    <div class = "row card-content">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
      <div class = "col-2 left-card">
        <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="card-image rounded-0"></b-card-img>
      </div>
      <div class = "col-10 right-card">
        <div class = "col-6 handyman-information">
          <div class = "handyman-name">
            <strong>{{handyman.firstName}} {{handyman.lastName}}</strong>
          </div>
          <div class = "handyman-profession">
            <strong>{{handyman.profession}}</strong>
          </div>
        </div>
        <div class = "col-6 create-request-button">
          <b-button variant="outline-primary" v-b-modal="this.handyman._id">Create request</b-button>
        </div>
      </div>
    </div>
    <div>
      <b-modal :id="this.handyman._id" size="lg" title="Create a Request">
        <b-container fluid>
          <b-row>
            <b-col cols="6">
              <div>
                <label>Address For Job</label>
                <b-form-input type="text" v-model="address" placeholder="Enter your address"></b-form-input>
              </div>
              <div>
                <label>Date</label>
                <b-form-input type="date" v-model="date" placeholder="Date"></b-form-input>
              </div>
              <div>
                <label>Location</label>
                <b-form-input type="text" v-model="location" placeholder="Location(e.g Gothenburg)"></b-form-input>
              </div>
            </b-col>
            <b-col cols="6">
              <div>
                <label>Name of Job</label>
                <b-form-input type="text" v-model="job" placeholder="e.g Architect"></b-form-input>
              </div>
              <div>
                <label>Job description</label>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder="Give your job description"
                  rows="6"
                type="text"
                v-model="description">
                </b-form-textarea>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <div>
              <b-button @click="createRequest">Send request</b-button>
            </div>
          </b-row>
        </b-container>
      </b-modal>
    </div>
    <div style="min-height: 170px;">
      <b-toast id="toast-message" title="Message" static no-auto-hide>
        {{message}}
      </b-toast>
    </div>
  </div>
</template>
<script>
import { Api } from '../Api.js'
export default {
  name: 'Handyman',
  data() {
    return {
      address: '',
      date: '',
      location: '',
      job: '',
      description: '',
      message: ''
    }
  },
  props: {
    handyman: Object,
    clientId: String
  },
  methods: {
    createRequest() {
      const createdRequest = {
        client: this.clientId,
        address: this.address,
        date: this.date,
        handyman: this.handyman._id,
        job: this.job,
        description: this.description
      }
      Api.post(`/clients/${this.clientId}/requests`, createdRequest).then(response => {
        console.log(response.data)
      }).catch(err => {
        this.message = err
        this.$bvToast.show('toast-message')
        console.log({
          error: err,
          reason: 'Invalid Credentials'
        })
      })
    }
  }
}
</script>
<style scoped>
    .class-text-button{
      display:flex;
      justify-content:flex-start;
      width:100%
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
      font-family: "Open Sans", sans-serif;
    }
    .create-request-button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
</style>
