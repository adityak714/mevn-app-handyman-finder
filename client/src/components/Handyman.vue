<template>
    <!--
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
        -->

  <b-card no-body class="overflow-hidden card">
    <b-row no-gutters class = "card-container">
      <b-col cols = "1" class = "left-card">
        <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0 card-image"></b-card-img>
      </b-col>
      <b-col cols = "11" class = "right-card">
          <b-col cols = "6" class = "handyman-information">
            <b-card-title>Oscar Reina</b-card-title>
            <b-card-text>Electrician</b-card-text>
          </b-col>
          <b-col cols = "6" class =  "create-request-button">
            <b-button v-b-modal.modal-1 variant="outline-primary">Create request</b-button>
              <b-modal id="modal-1" size="lg" title="Create a Request">
                  <b-container fluid>
                      <b-row>
                          <b-col cols="6">
                              <div>
                                  <label>Address For Job</label>
                                  <b-form-input type="text" v-model="text" placeholder="Enter your address"></b-form-input>
                              </div>
                              <div>
                                  <label>Date</label>
                                  <b-form-input type="date" v-model="text" placeholder="Date"></b-form-input>
                              </div>
                              <div>
                                  <label>Location</label>
                                  <b-form-input type="text" v-model="text" placeholder="Location(e.g Gothenburg)"></b-form-input>
                              </div>
                          </b-col>
                          <b-col cols="6">
                              <div>
                                  <label>Name of Job</label>
                                  <b-form-input type="text" v-model="text" placeholder="e.g Architect"></b-form-input>
                              </div>
                              <div>
                                  <label>Job description</label>
                                  <b-form-textarea
                                      id="textarea-rows"
                                      placeholder="Give your job description"
                                      rows="6">
                                  </b-form-textarea>
                                  </div>
                          </b-col>
                      </b-row>
                      <b-row>
                          <div>
                              <b-button>Send request</b-button>
                          </div>
                      </b-row>
                  </b-container>
              </b-modal>
          </b-col>
      </b-col>
    </b-row>
  </b-card>
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

.create-request-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

.right-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.card-container {
  width: 100%;
}

</style>
