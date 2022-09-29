<template>
     <b-container fluid class = "information-container">
              <p class="sign-up">Create Your Account</p>
              <form class="sign-up-form" id="first-name">
                <input v-model="firstName"  placeholder="type your firstname">
              </form>
              <form class="sign-up-form" id="lastname">
                  <input v-model= "lastName" class="input" placeholder="type your lastname">
              </form>
              <form class="sign-up-form" id="email">
                  <input type="email" v-model="email" class="input" placeholder="type your email">
              </form>
              <form class="sign-up-form" id="phonenumber">
                  <input type="text" v-model="phonenumber"  placeholder="phonenumber">
              </form>
              <form class="sign-up-form" id="address">
                  <input type="text" v-model="address" placeholder="address">
              </form>
              <form class="sign-up-form" id="password" >
                  <input type="password" v-model= "password"  placeholder="password">
              </form>
              <form class="sign-up-form" id="confirm-password">
                  <input type = "password"  placeholder="confirm password">
              </form>
              <div>
                <Button :description="SignUp" @click="createUser()"/>
                <a href= ""><p class="account-exist"><u>Already have an account?</u></p></a>
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
      margin-top: 5px;
      margin-bottom: 5px;
      min-height: 35px;
      align-items: center;
      display: flex;
      background: rgba(247, 233, 118, 0.5);
      border-radius: 30px;
      color: #808080;
  }
  .sign-up {
      font-size: 30px;
      margin-bottom: 10px;
      font-weight: bold;
      font-style: italic;
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
    b-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      min-height: 400px;
  }
</style>
