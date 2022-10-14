<template>
  <b-container fluid class = "information-container">
    <p class="sign-up">Create Your Account</p>
    <p>Sign up as a ... </p>
    <b-col cols = "12" class = "sign-up-form">
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Client" active variant="danger">
          <form class="sign-up-form" id="first-name">
            <input v-model="firstName"  placeholder="First Name">
          </form>
          <form class="sign-up-form" id="lastname">
              <input v-model="lastName" class="input" placeholder="Last Name">
          </form>
          <form class="sign-up-form" id="email">
              <input type="email" v-model="email" class="input" placeholder="Email">
          </form>
          <form class="sign-up-form" id="phonenumber">
              <input type="text" v-model="phoneNumber" placeholder="Phone Number">
          </form>
          <form class="sign-up-form" id="address">
              <input type="text" v-model="address" placeholder="Address">
          </form>
          <form class="sign-up-form" id="password" >
              <input type="password" v-model='password' placeholder="Password">
          </form>
          <form class="sign-up-form" id="confirmPassword">
              <input type = "password" v-model='confirmpassword' placeholder="Confirm Password">
          </form>
          <div class="button-container">
            <p class="account-exist"><a href="/login"><u>Already have an account?</u></a></p>
            <b-button @click="createClient" class="sign-up-btn">Sign Up</b-button>
          </div>
        </b-tab>
        <b-tab title="Handyman">
          <form class="sign-up-form" id="h_first-name">
            <input v-model="firstName"  placeholder="First Name">
          </form>
          <form class="sign-up-form" id="h_lastname">
              <input v-model="lastName" class="input" placeholder="Last Name">
          </form>
          <form class="sign-up-form" id="h_email">
              <input type="email" v-model="email" class="input" placeholder="Work Email">
          </form>
          <form class="sign-up-form" id="h_phonenumber">
              <input type="text" v-model="phoneNumber" placeholder="Contact Number">
          </form>
          <form class="sign-up-form" id="h_password" >
              <input type="password" v-model='password' placeholder="Password">
          </form>
          <form class="sign-up-form" id="h_confirmPassword">
              <input type = "password" v-model='confirmpassword' placeholder="Confirm Password">
          </form>
          <form class="sign-up-form" id="h_profession">
              <input type="text" v-model="profession" placeholder="Profession">
          </form>
          <b-form-select class="sign-up-form" id="select-area" v-model="area" :options="area_options" size="sm"></b-form-select>
          <div class="button-container">
            <p class="account-exist"><a href="/login"><u>Already have an account?</u></a></p>
            <b-button @click="createHandyman" class="sign-up-btn">Sign Up</b-button>
          </div>
          <div>
            <b-modal id="signup-failed" title="Invalid">
            <p class="my-4">Passwords do not match.</p>
            </b-modal>
          </div>
          <b-modal id="fill-all-fields" title="Invalid">
          <p class="my-4">Please fill in all the fields. </p>
          </b-modal>
          <b-modal id="acc-already-exists" title="Invalid">
          <p class="my-4">An account with this email already exists.</p>
          </b-modal>
        </b-tab>
      </b-tabs>
    </b-col>

    <!--
    <b-row>
      <b-col cols = "12">
        <p class="sign-up">Create Your Account</p>
        <form class="sign-up-form" id="first-name">
          <input v-model="firstName"  placeholder="First Name">
        </form>
        <form class="sign-up-form" id="lastname">
            <input v-model="lastName" class="input" placeholder="Last Name">
        </form>
        <form class="sign-up-form" id="email">
            <input type="email" v-model="email" class="input" placeholder="Email">
        </form>
        <form class="sign-up-form" id="phonenumber">
            <input type="text" v-model="phoneNumber" placeholder="Phone Number">
        </form>
        <form class="sign-up-form" id="address">
            <input type="text" v-model="address" placeholder="Address">
        </form>
        <form class="sign-up-form" id="password" >
            <input type="password" v-model='password' placeholder="Password">
        </form>
        <form class="sign-up-form" id="confirmPassword">
            <input type = "password" v-model='confirmpassword' placeholder="Confirm Password">
        </form>
        <b-form-select class="sign-up-form" id = "select-profession" v-model="profession" :options="options" size="sm"></b-form-select>
        <div class="button-container">
          <a href="/login"><p class="account-exist"><u>Already have an account?</u></p></a>
          <b-button @click="createUser" class="sign-up-btn">Sign Up</b-button>
        </div>
        <div>
          <b-modal id="signup-failed" title="Invalid">
          <p class="my-4">Passwords do not match.</p>
          </b-modal>
        </div>
          <b-modal id="fill-all-fields" title="Invalid">
          <p class="my-4">Please fill in all the fields. </p>
          </b-modal>
      </b-col>
    </b-row>
    -->
  </b-container>
</template>
<script>
import { Api } from '../Api'

export default {
  name: 'Form',
  props: {
    header: String
  },
  components: {

  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      area: '',
      address: '',
      password: '',
      confirmpassword: '',
      profession: '',
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
  methods: {
    createClient() {
      if (this.firstName === '' || this.lastName === '' ||
          this.email === '' || this.phoneNumber === '' || this.address === '' ||
            this.password === '' || this.confirmpassword === '') {
        this.$bvModal.show('fill-all-fields')
      } else {
        if (this.password !== this.confirmpassword) {
          this.$bvModal.show('signup-failed')
        } else {
          const auth = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            password: this.password
          }
          Api.post('/clients', auth)
            .then(response => {
              console.log(response.data)
              if (response.status === 201) {
                this.$router.push('/login')
              }
            })
            .catch(error => {
              if (error.response.status === 400) {
                this.$bvModal.show('acc-already-exists')
                console.log('Account exists!')
              }
              console.log({
                error: error,
                reason: 'Invalid Credentials'
              })
            })
        }
      }
    },
    createHandyman() {
      if (this.firstName === '' || this.lastName === '' ||
          this.email === '' || this.phoneNumber === '' || this.area === '' ||
            this.password === '' || this.confirmpassword === '') {
        this.$bvModal.show('fill-all-fields')
      } else {
        if (this.password !== this.confirmpassword) {
          this.$bvModal.show('signup-failed')
        } else {
          const handyAuth = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            area: this.area,
            profession: this.profession,
            password: this.password
          }
          Api.post('/handymen', handyAuth)
            .then(response => {
              if (response.status === 201) {
                this.$router.push('/login')
              }
            })
            .catch(error => {
              if (error.response.status === 400) {
                this.$bvModal.show('acc-already-exists')
              }
              console.log({
                error: error,
                reason: 'Invalid Credentials'
              })
            })
        }
      }
    }
  }
}
</script>
<style scoped>
  form.sign-up-form {
    padding: 7px 0px 7px 0px;
  }
  .sign-up-form {
      display: flex;
      min-height: 35px;
      border-radius: 10px;
      border: 0.5px solid grey;
      margin: 10px;
      justify-content: center;
      align-items: center;
      color: grey;
      margin-bottom: 20px;
  }
  div.sign-up-form {
    border: 0px;
  }
  .sign-up {
      font-size: 30px;
      margin-bottom: 10px;
      font-weight: bold;
  }
  b-form-input{
      color: #F7E976;
      border-radius: 10px;
      border:none;
      width: 30px;
      padding-top: 2px;
      padding-bottom: 2px;
      margin-top: 5px;
      margin-bottom: 5px;
  }
  .sign-up-btn {
    border-radius: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    border: 0.5px solid grey;
    color: black;
    background-color: white;
    flex-shrink: 1;
  }
  .tabs {
    width: 75%;
  }
  .sign-up-btn:hover {
  border-radius: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  border: none;
  color: black;
  background-color:rgba(247, 233, 118, 0.5);
  }
  #select-area {
    width: 96%;
    text-align: center;
    font-size: 15.75px;
  }
  #firstName{
      background-color: #F7E976;
      border-radius: 10px;
      border:none;
      width: 30px;
      padding-top: 2px;
      padding-bottom: 2px;
      margin-top: 5px;
      margin-bottom: 5px;
  }
  .button-container {
    padding-top: 20px;
  }
  b-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 400px;
  }
</style>
