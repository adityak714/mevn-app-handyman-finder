<template>
     <b-container fluid class = "information-container">
              <p class="sign-up">Create Your Account</p>
              <form class="sign-up-form" id="first-name">
                <input v-model="firstName"  placeholder="First Name">
              </form>
              <form class="sign-up-form" id="lastname">
                  <input v-model= "lastName" class="input" placeholder="Last Name">
              </form>
              <form class="sign-up-form" id="email">
                  <input type="email" v-model="email" class="input" placeholder="Email">
              </form>
              <form class="sign-up-form" id="phonenumber">
                  <input type="text" v-model="phonenumber"  placeholder="Phone Number">
              </form>
              <form class="sign-up-form" id="address">
                  <input type="text" v-model="address" placeholder="Address">
              </form>
              <form class="sign-up-form" id="password" >
                  <input type="password" v-model= "password"  placeholder="Password">
              </form>
              <form class="sign-up-form" id="confirm-password">
                  <input type = "password"  placeholder="Confirm Password">
              </form>
              <div class="button-container">
                <Button text="Sign Up" @click="createUser()"/>
                <a href= "/login"><p class="account-exist"><u>Already have an account?</u></p></a>
        </div>
        </b-container>
</template>
<script>
import Button from '@/components/Button.vue'
export default {
  name: 'Form',
  props: {
    header: String
  },
  components: {
    Button
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
      console.log(this.firstName)
      console.log(this.lastName)
      console.log(this.email)
      console.log(this.phoneNumber)
      console.log(this.address)
      console.log(this.password)
      console.log(this.confirmpassword)
    }
  }
}
</script>
<style scoped>
    .sign-up-form {
      padding-top: 2px;
      padding-bottom: 2px;
      margin: 5px;
      min-height: 35px;
      align-items: center;
      display: flex;
      background: rgba(100, 0, 0, 0.4);;
      border-radius: 30px;
      color: black;
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
