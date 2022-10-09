<template>
     <b-container fluid class = "information-container">
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
              <div class="button-container">
                <a href= "/login"><p class="account-exist"><u>Already have an account?</u></p></a>
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
      address: '',
      password: '',
      confirmpassword: ''
    }
  },
  methods: {
    createUser() {
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
              this.$router.push('/login')
            })
            .catch(error => {
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
    .sign-up-form {
      min-height: 35px;
      border-radius: 10px;
      margin: 10px;
      justify-content: flex-start;
      align-items: center;
      display: flex;
      border: 0.5px solid grey;
      color: black;
      margin-bottom: 20px;
  }
  .sign-up {
      font-size: 40px;
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
