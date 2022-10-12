<template>

        <!--
        <b-row class = "card-container">
          <b-col cols = "12" class = "card">
            <b-col cols = "2" class ="left-card">
              <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="card-image rounded-0"></b-card-img>
            </b-col>

            <b-col cols = "10" class ="right-card">
              <b-col cols = "6" class = "handyman-information">
                  Oscar Reina Gustafsson
              </b-col>
              <b-col cols = "6" class = "create-request">
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
          </b-col>
        </b-row>

          <div class = "col-10 right-card">
            <div class = "col-6 handyman-information">
                <div class = "handyman-name">
                    <strong>{{handyman.firstName}} {{handyman.lastName}}</strong>
                </div>
                <div class = "handyman-profession">
                  <strong>{{handyman.profession}}</strong>
                </div>
            </div>
          </div>
          -->
  <div>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <b-card no-body class="overflow-hidden card">
      <b-row no-gutters>

        <b-col md="3" class = "left-card">
          <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0 image"></b-card-img>
        </b-col>

        <b-col md="6" class = "right-card">
            <b-col cols="6">
              <b-card-body class = "handyman-name" title="Handyman Name">
                <b-card-text class = "handyman-profession">
                  Plumber
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col cols="6" class = "create-request">
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
</div>
</template>
<script>
export default {
  name: 'Handyman',
  data() {
    return {
      address: '',
      datetime: '',
      location: '',
      job: '',
      description: ''
    }
  },
  props: {
    handyman: Object
  }
}
</script>
<style scoped>
.image {
  height: 50px;
  width: 50px;
}

.class-text-button{
  display:flex;
  justify-content:flex-start;
  width:100%
}

.create-request {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

.card-container {
  height: 100%;
  display: flex;
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

.area-location{
  width: 300px;
}

.card {
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.2s;
}

@media only screen and (max-width: 361px) {
  .card {
    background-color: lightblue;
  }
}

</style>
