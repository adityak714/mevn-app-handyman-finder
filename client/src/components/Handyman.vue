<template>
  <div>
    <div>
      <b-container no-body class="overflow-hidden card">
          <b-row class = "card-container">
            <b-col cols = "2" class = "left-card">
              <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0 card-image"></b-card-img>
            </b-col>
            <b-col cols = "10" class = "medium-card">
              <b-col cols = "9" class = "handyman-information">
                <b-col cols = "12">
                  {{ handyman.firstName }} {{ handyman.lastName }}
                </b-col>
                <b-col cols = "12">
                  {{ handyman.profession }}
                </b-col>
              </b-col>
              <b-col cols = "3">
                <b-button v-b-modal="this.handyman._id" @click="showReviews" variant="outline-primary" class = "create-request-button">Create request</b-button>
              </b-col>

            </b-col>
          </b-row>
      </b-container>
    </div>
    <div>
      <b-modal :id="this.handyman._id" size="lg" scrollable :title="this.handyman.firstName + ' ' +  this.handyman.lastName" hide-footer>
        <b-row>
          <b-col cols="12">
            <div class="title-container">
            <p class="title">All Reviews</p>
          </div>
          </b-col>
        </b-row>
        <div class="col-12 no-requests" v-if="this.reviews.length === 0">
          <p class="message">No requests found</p>
        </div>
        <b-container fluid class="make-container" v-if="this.reviews.length !== 0">
          <b-col cols = "12" cards >
            <b-row class = "card-row" v-for="review in reviews" :key="review._id">
              <Review :review="review" />
            </b-row>
          </b-col>
        </b-container>
        <div>
          <b-col cols="12">
            <div class="title-container">
              <p class="title">Make a review</p>
            </div>
          </b-col>
          <b-container fluid class="make-container">
            <b-row>
              <b-col cols="12">
                <div class="review">
                  <label><strong>Rate this handyman</strong></label>
                  <b-form-rating v-model="rating" variant="warning" class="mb-2" show-value></b-form-rating>
                </div>
              </b-col>
              <b-col sm="2">
                <label for="textarea-small"><strong>Comment:</strong></label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea
                  id="textarea-small"
                  size="sm"
                  v-model="comment"
                  placeholder="Give a review comment"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div class="make-button">
                  <b-button variant="outline-primary" @click="createReview">Submit review</b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <b-col cols="12">
          <div class="title-container">
            <p class="title">Make a request</p>
          </div>
        </b-col>
        <div>
          <b-container fluid class="make-container">
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
              </b-col>
              <b-col cols="6">
                <div>
                  <label>Name of Job</label>
                  <b-form-input id="job" type="text" v-model="job" placeholder="Architect"></b-form-input>
                </div>
                <div>
                  <label>Job description</label>
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder="Give your job description"
                    rows="6"
                    type="text"
                    v-model="description"
                  >
                  </b-form-textarea>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div class="make-button">
                  <b-button variant="outline-primary" @click="createRequest">Send request</b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-modal>
    </div>
  </div>
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
</template>
<script>
import { Api } from '../Api.js'
import Review from '../components/Review'
export default {
  name: 'Handyman',
  data() {
    return {
      reviews: [],
      clientid: '',
      rating: 0,
      comment: '',
      address: '',
      date: '',
      job: '',
      description: '',
      message: ''
    }
  },
  props: {
    handyman: Object
  },
  methods: {
    createRequest() {
      if (this.address === '' || this.job === '' || this.description === '') {
        this.$bvToast.toast('Please fill all fields')
      } else {
        const searchURL = new URL(window.location).pathname
        const strs = searchURL.split('/')
        const id = strs.at(-1)
        const createdRequest = {
          address: this.address,
          date: this.date,
          handyman: this.handyman._id,
          job: this.job,
          description: this.description
        }
        Api.post(`/clients/${id}/requests`, createdRequest).then(response => {
          console.log(response.data)
          this.$bvModal.hide(this.handyman._id)
        }).catch(err => {
          this.message = err
          this.$bvToast.toast('Request added successfully')
          console.log({
            error: err,
            reason: 'Invalid Credentials'
          })
        })
      }
    },
    clear() {
      this.rating = 0
      this.comment = ''
    },
    createReview() {
      if (this.rating === '' || this.comment === '') {
        this.$bvToast.toast('Please fill all fields', {
          title: 'Error Message',
          variant: 'danger',
          solid: true
        })
      } else {
        const searchURL = new URL(window.location).pathname
        const strs = searchURL.split('/')
        const id = strs.at(-1)
        this.clientid = id
        const createdReview = {
          rating: this.rating,
          comment: this.comment,
          sender: this.clientid
        }
        Api.post(`/handymen/${this.handyman._id}/reviews`, createdReview).then(response => {
          console.log(response.data)
          this.$bvToast.toast('Review added successfully', {
            title: 'Success Message',
            variant: 'success',
            solid: true
          })
          this.clear()
        }).catch(err => {
          if (err.response.status === 404) {
            this.message = err
            this.$bvToast.toast('Handyman not found', {
              title: 'Error Message',
              variant: 'warning',
              solid: true
            })
          }
          console.log({
            error: err,
            reason: 'Invalid Credentials'
          })
        })
      }
    },
    showReviews() {
      Api.get(`/handymen/${this.handyman._id}/reviews`).then(response => {
        console.log(response.data)
        this.reviews = response.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    Review
  }
}
</script>
<style scoped>

.card {
  min-height: 100px;
  height: 100%;
  margin-bottom: 30px;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.medium-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 25px;
}

.create-request-button {
  justify-content: flex-end;
  display: flex;
}

.handyman-information {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.modal-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.card-image {
  height: 70px;
  width: 70px;
  margin-left: 0px;
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
  display: flex;
  justify-content: center;
}
.make-container{
  background-color: #C8C8C8;
  border-radius: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.make-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px
}
.mb-2 {
  border:none
}
.review {
  display:flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px
}

.create-request-button {
  font-size: 13px;
}

.card-row {
  display: flex;
  justify-content: center;
}
</style>
