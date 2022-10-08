<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <b-row>
        <b-col col="12">
         <div class="header-container">
            <ClientHeader :userId="id" :firstName="fn" :lastName="ln"/>
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
                    <div class="row" style="align-items: center; justify-content: center;">
                      <button class="btn btn-primary change-password-button" id="pass-change" type="button" @click="changePasswordPopup">Update Password</button>
                      <button class="btn btn-primary delete-account-button" style="margin-top: 10px;" id="del_button" type="button" @click="delAcc">Delete Profile</button>
                    </div>
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
                          <div class="col-md-12 input"><label class="labels">Email</label><input type="text" class="form-control" v-model.lazy="updatedEmail" :placeholder="email" value=""></div>
                          <div class="col-md-12 input"><label class="labels">Address</label><input type="text" class="form-control" v-model.lazy="updatedAddress" :placeholder="address" value=""></div>
                          <div class="col-md-12 input"><label class="labels">Phone Number</label><input type="text" class="form-control" v-model.lazy="updatedPhoneNumber" :placeholder="phoneNumber" value=""></div>
                          <div class="col-md-12 input" v-if="profession !== ''"><label class="labels">Occupation</label><input type="text" class="form-control" v-model.lazy="updatedProfession" :placeholder="profession" value=""></div>
                      </div>
                      <div class="mt-5 text-center"><button class="btn btn-primary profile-button" @click="updateUser" type="button">Save Profile</button></div>
                    </div>
                  </div>
              </div>
            </div>
            <div>
              <b-modal id="modal-center" centered title="You are about to delete your account" ok-title="Delete" ok-variant="danger" :ok-disabled="passwordIsCorrect">
                <div class="col-md-10 input"><label class="labels">Password</label>
                <input type="text" class="form-control" v-model="password" value="">
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
      updatedfirstName: '',
      updatedlastName: '',
      oldPassword: '',
      newPassword: '',
      confirmPass: '',
      updatedEmail: '',
      updatedAddress: '',
      updatedPhoneNumber: '',
      email: '',
      address: '',
      phoneNumber: '',
      profession: '',
      updatedProfession: '',
      currPassHash: ''
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
    delAcc() {
      this.$bvModal.show('modal-center')
    },
    changePasswordPopup() {
      this.$bvModal.show('change-password')
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
                this.address = res.data.address
                this.profession = res.data.profession
                this.currPassHash = res.data.password
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
          }
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
          if (response.status === 404) {
            Api.patch(`/handymen/${this.id}`, { password: this.newPassword }).then(response => {
              this.$router.push(`/account/${this.id}`)
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

      Api.put(`/clients/${id}`, {
        firstName: this.updatedFirstName || this.fn,
        lastName: this.updatedLastName || this.ln,
        phoneNumber: this.updatedPhoneNumber || this.phoneNumber,
        email: this.updatedEmail || this.email,
        address: this.updatedAddress || this.address
      }).then(response => {
        if (response.data === 'No such client exists!') {
          Api.put(`/handymen/${id}`, {
            firstName: this.updatedFirstName || this.fn,
            lastName: this.updatedLastName || this.ln,
            phoneNumber: this.updatedPhoneNumber || this.phoneNumber,
            email: this.updatedEmail || this.email,
            address: this.updatedAddress || this.address,
            profession: this.updatedProfession || this.profession
          }).then(response => {
            console.log(response.data)
          }).catch(error => {
            this.firstname = error
          })
        }
        console.log(response.data)
        this.$router.push(`/account/${id}`)
      })
        .catch(error => {
          console.log(error.response.status)
        })
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
background-color: rgba(100, 0, 0, 0.4);
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
</style>
