<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <b-row>
        <b-col col="12">
         <div class="header-container">
            <ClientHeader :userId="id" :firstName="fn" :lastName="ln" :isHandyman="isHandy"/>
         </div>
        </b-col>
    </b-row>
    <b-row>
      <b-container fluid>
        <div class="main-container">
            <div class="container rounded bg-white mt-5 mb-5">
              <div class="row info-container">
                  <div class = "col-md-3 border-right left-container">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                          <div class="material-symbols-outlined">person</div>
                          <span class="font-weight-bold">{{fn}} {{ln}}</span>
                          <span class="text-black-50">{{email}}</span>
                        </div>
                    <b-row class="row left-container-options">
                      <b-col cols = "12">
                        <button class="btn btn-primary change-password-button" id="pass-change" type="button" @click="changePasswordPopup">Update Password</button>
                      </b-col>
                      <b-col cols = "12">
                        <button class="btn btn-primary delete-account-button" id="del_button" type="button" @click="delAccPopup">Delete Profile</button>
                      </b-col>
                    </b-row>
                  </div>
                  <div class="col-md-9">
                    <div class="settings p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right">Profile Settings</h4>
                      </div>
                      <div class="row mt-2">
                          <div class="col-md-6 input"><label class="labels">First Name</label><input type="text" class="form-control" v-model="updatedFirstName" :placeholder="fn" value=""></div>
                          <div class="col-md-6 input"><label class="labels">Last Name</label><input type="text" class="form-control" v-model="updatedLastName" :placeholder="ln" value=""></div>
                      </div>
                      <div class="row mt-3">
                          <div class="col-md-12 input"><label class="labels">Email</label><input type="text" class="form-control" :placeholder="email" readonly></div>
                          <div class="col-md-12 input"><label class="labels">Phone Number</label><input type="text" class="form-control" v-model="updatedPhoneNumber" :placeholder="phoneNumber" value=""></div>
                          <div class="col-md-12 input" v-if="area !== ''"><label class="labels">Profession</label><input type="text" class="form-control" v-model="updatedProfession" :placeholder="profession" value=""></div>
                          <div class="col-md-12 input" v-if="area !== ''"><b-form-select class="mt-3 form-control" :options="area_options" v-model="updatedArea"></b-form-select></div>
                          <div class="col-md-12 input" v-else><label class="labels">Address</label><input type="text" class="form-control" v-model="updatedAddress" :placeholder="address" value=""></div>
                      </div>
                      <div class="mt-5 text-center"><button class="btn btn-primary profile-button" @click="updateUser" type="button">Save Profile</button></div>
                    </div>
                  </div>
              </div>
            </div>
            <div>
              <b-modal id="modal-center" centered title="You are about to delete your account" ok-title="Delete" ok-variant="danger" @ok="delAcc" :ok-disabled="oldPassword === ''">
                <div class="col-md-10 input"><label class="labels">Password</label>
                <input type="password" class="form-control" v-model="oldPassword" value="">
                <p class="my-4">Are you sure?</p>
                </div>
              </b-modal>
              <b-modal id="change-password" title="Change Password" ok-title="Change" ok-variant="primary" @ok="changedPassword">
                <div class="col-md-10 input">
                  <label class="labels">Old Password</label><input type="password" class="form-control" v-model="oldPassword" value="">
                  <label class="labels">New Password</label><input type="password" class="form-control" v-model="newPassword" value="">
                  <label class="labels">Confirm Password</label><input type="password" class="form-control" v-model="confirmPass" value="">
                  <p class="my-4">Are you sure?</p>
                </div>
              </b-modal>
            </div>
          </div>
      </b-container>
    </b-row>
</div>
</template>

<script>
import ClientHeader from '../components/ClientHeader.vue'
import { Api } from '@/Api'

export default {
  name: 'ClientProfilePage',
  components: {
    ClientHeader
  },
  data() {
    return {
      id: '',
      fn: '',
      ln: '',
      updatedFirstName: '',
      updatedLastName: '',
      updatedArea: '',
      oldPassword: '',
      newPassword: '',
      confirmPass: '',
      updatedEmail: '',
      updatedAddress: '',
      updatedPhoneNumber: '',
      email: '',
      area: '',
      address: '',
      phoneNumber: '',
      profession: '',
      updatedProfession: '',
      isHandy: Boolean,
      currPassHash: '',
      area_options: [
        { value: '', text: 'Preferred Area of Work' },
        { value: 'Västra Götaland', text: 'Västra Götaland' },
        { value: 'Stockholms Län', text: 'Stockholms Län' },
        { value: 'Skåne Län', text: 'Skåne Län' },
        { value: 'Hallands Län', text: 'Hallands Län' },
        { value: 'Jönköpings Län', text: 'Jönköpings Län' },
        { value: 'Uppsala Län', text: 'Uppsala Län' }
      ]
    }
  },
  created() {
    if (localStorage.getItem('token') === null && localStorage.getItem('user') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
    const searchURL = new URL(window.location).pathname
    const strs = searchURL.split('/')
    const id = strs.at(-1)
    this.id = id
    this.getUser(id)
  },
  methods: {
    delAccPopup() {
      this.$bvModal.show('modal-center')
      this.oldPassword = ''
    },
    delAcc() {
      const SHA3 = require('../../../server/node_modules/sha3/index')
      const hash = new SHA3.SHA3(512)
      hash.update(this.oldPassword)

      if (hash.digest('hex') === this.currPassHash) {
        if (this.isHandy) {
          Api.delete(`/handymen/${this.id}`)
            .then(res => {
              console.log(res.data)
              localStorage.clear()
              this.$router.push('/login')
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          Api.delete(`/clients/${this.id}`)
            .then(response => {
              console.log(response.data)
              localStorage.clear()
              this.$router.push('/login')
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        this.$bvToast.toast('Password does not match.', {
          title: 'Deletion unsuccessful',
          variant: 'danger',
          solid: true
        })
      }
    },
    changePasswordPopup() {
      this.$bvModal.show('change-password')
      this.oldPassword = ''
    },
    getUser(id) {
      Api.get(`/clients/${id}`)
        .then(response => {
          if (response.data === 'No such client exists!') {
            Api.get(`/handymen/${id}`)
              .then(res => {
                this.fn = res.data.firstName
                this.ln = res.data.lastName
                this.phoneNumber = res.data.phoneNumber
                this.email = res.data.email
                this.area = res.data.area
                this.profession = res.data.profession
                this.currPassHash = res.data.password
                this.isHandy = true
                this.$emit('isHandy', true)
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.fn = response.data.firstName
            this.ln = response.data.lastName
            this.phoneNumber = response.data.phoneNumber
            this.email = response.data.email
            this.address = response.data.address
            this.currPassHash = response.data.password
            this.isHandy = false
            this.$emit('isHandy', false)
          }
          console.log(this.isHandy)
        })
        .catch(error => {
          console.log(error)
        })
    },
    changedPassword() {
      const SHA3 = require('../../../server/node_modules/sha3/index')
      const hash = new SHA3.SHA3(512)
      hash.update(this.oldPassword)

      if (this.newPassword === this.confirmPass && hash.digest('hex') === this.currPassHash) {
        Api.patch(`/clients/${this.id}`, { password: this.newPassword }).then(response => {
          if (response.data === 'Client could not be found.') {
            Api.patch(`/handymen/${this.id}`, { password: this.newPassword }).then(response => {
              console.log(response.data)
            }).catch(error => console.log(error))
          }
          this.$router.push(`/account/${this.id}`)
        }).catch(error => console.log(error))
        return true
      } else {
        return false
      }
    },
    updateUser() {
      const searchURL = new URL(window.location).pathname
      const strs = searchURL.split('/')
      const id = strs.at(-1)
      console.log(id)
      if (this.isHandy) {
        Api.put(`/handymen/${id}`, {
          firstName: this.updatedFirstName || this.fn,
          lastName: this.updatedLastName || this.ln,
          phoneNumber: this.updatedPhoneNumber || this.phoneNumber,
          area: this.updatedArea || this.area,
          profession: this.updatedProfession || this.profession
        }).then(response => {
          console.log(response.data)
          this.$router.push(`/account/${id}`)
        }).catch(error => {
          console.log(error)
        })
      } else {
        Api.put(`/clients/${id}`, {
          firstName: this.updatedFirstName || this.fn,
          lastName: this.updatedLastName || this.ln,
          phoneNumber: this.updatedPhoneNumber || this.phoneNumber,
          address: this.updatedAddress || this.address
        }).then(response => {
          console.log(response.data)
          this.$router.push(`/account/${id}`)
        }).catch(error => {
          console.log(error.response.status)
        })
      }
    }
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  display: block;
  padding-top: 10px;
  margin: 10px 0px 60px 0px;
  scale: calc(4);
}

.main-container {
padding-top: 20px;
display: flex;
background-image: linear-gradient(to bottom right, rgba(222, 46, 23, 0.5), rgba(159, 16, 8, 0.85));
min-height: 1000px;
align-items: flex-start;
justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
}

.info-container {
  border-radius: 30px;
}

.header-container{
border:#9D5100
}
.content{
display:flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
/*padding-top: 50px;*/
background-color: white;
height: 480px;
}

.title{
font-size: 50px;
}
.button{
    width: 100px;
    background-color: rgba(100, 0, 0, 0.4);
}

.input {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  text-align: left;
}

.settings {
  display: flex;
  flex-direction:column;
  justify-content: center;
  margin-right: 25px;
}

.left-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-break:break-all;
}
.delete-account-button {
  align-self: flex-end;
  background-color: #007BFF;
  border-width: 0px;
}
.delete-account-button:hover {
  align-self: flex-end;
  background-color: red;
}

.delete-account-button {
  margin-top: 10px;
}
</style>
