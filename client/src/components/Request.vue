<template>
  <div>
    <div>
      <b-container no-body class="overflow-hidden card">
        <b-row class = "card-container">
          <b-col cols = "12" class = "medium-card">
            <b-col cols = "9" class = "handyman-information">
              <b-col cols = "12">
                Date created: {{ request.creationDate }}
              </b-col>
              <b-col cols = "12">
                Requested for: {{ request.date }}
              </b-col>
              <b-col cols = "12">
                Job: {{request.job}}
              </b-col>
              <b-col cols = "12">
                Desc: {{ request.description }}
              </b-col>
              <b-col cols = "12" v-if="request.status === 'Accepted'">
                Phone Number: {{ request.handyman }}
              </b-col>
              <b-col cols="12" v-if="isHandy === true">
                  Change Status: <b-form-select v-model="statusSelected" :options="status_options" size="sm" class="mt-3"></b-form-select>
              </b-col>
            </b-col>
            <b-col cols = "3">
              <b-row>
                <b-col cols="12" style="display: flex; justify-content: center; margin-bottom: 5px">Status: {{statusSelected === '' ? request.status : statusSelected }}</b-col>
                <b-col cols="12" style="display: flex; justify-content: center; margin-bottom: 5px" v-if="isHandy === true"><b-button @click="saveChanges" variant="outline-primary">Save Changes</b-button></b-col>
                <b-col cols="12" style="display: flex; justify-content: center; margin-bottom: 5px" v-else>
                  <b-button variant="outline-primary" @click="deleteRequest">Delete request</b-button>
                </b-col>
              </b-row>
            </b-col>
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
import { Api } from '../Api'
export default {
  name: 'Request',
  data() {
    return {
      statusSelected: '',
      status_options: [
        { value: '', text: 'Change the status' },
        { value: 'Accepted', text: 'Accepted' },
        { value: 'Rejected', text: 'Rejected' }
      ]
    }
  },
  props: {
    request: Object,
    isHandy: Boolean
  },
  methods: {
    deleteRequest() {
      const searchURL = new URL(window.location).pathname
      const strs = searchURL.split('/')
      const id = strs.at(-1)
      Api.delete(`/clients/${id}/requests/${this.request._id}`).then(response => {
        if (response.status === 204) {
          console.log(response.data)
          this.$bvToast.toast('Request successfully deleted', {
            title: 'Success Message',
            variant: 'success',
            solid: true
          })
          setTimeout(() => window.location.reload(), 1000)
        }
      }).catch(err => {
        console.log(err)
        this.$bvToast.toast('Request could not be deleted', {
          title: 'Error Message',
          variant: 'danger',
          solid: true
        })
      })
    },
    saveChanges() {
      Api.patch(`/requests/${this.request._id}`, { status: this.statusSelected }).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          this.$bvToast.toast('Status successfully changed to ' + `${this.statusSelected}`, {
            title: 'Success Message',
            variant: 'success',
            solid: true
          })
          setTimeout(() => window.location.reload(), 1000)
        }
      }).catch(err => {
        console.log(err)
        this.$bvToast.toast('Request could not be found', {
          title: 'Error Message',
          variant: 'danger',
          solid: true
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
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  flex-direction: row;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 30px;
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
  height: 40px;
  width: 40px;
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
  justify-content: center
}
.mt-3{
  width: 300px;
  margin-bottom: 10px
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
.message{
  font-weight: bold;
}
.card-row {
  display: flex;
  justify-content: center;
}
</style>
