<template>
    <div class = "web-container">
      <b-row class = "container">
        <b-col cols = "9" class="left-container">
          <div class = "information-container">
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
              <form class="sign-up-form" id="password" placeholder="Password">
                  <input type="password" v-model= "password"  placeholder="password">
              </form>
              <form class="sign-up-form" id="confirm-password">
                  <input type = "password"  placeholder="confirm password">
              </form>
              <div class = "sign-up-btn-container">
                  <button class = "sign-up-btn">Sign Up</button>
              </div>
              <a href= ""><p class="account-exist"><u>Already have an account?</u></p></a>
            </div>
        </b-col>
        <b-col cols = "3" class="right-container">
          <p class="right-container-text">
            Why HandyMan App?
          </p><br>
        </b-col>
      </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'clientSignUp',
  data() {
    return {
      message: 'none',
      firstName: '',
      lastName: '',
      email: '',
      phonenumber: '',
      address: '',
      password: ''
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        }).catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>
  html{
    width: 100%;
    height: 100%;
  }
  .web-container{
      background-color: #EFEFEF52;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
  }
  .first-name{
    font-size: small;
  }
  .container {
      min-height: 600px;
  }
  .left-container {
    background: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .right-container {
    background-color: #0D1951;
  }
  .input{
      all: unset;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
  }
  .left-container {
      background-color: #FFFFFF;
  }
  .sign-up {
      font-size: 30px;
      margin-bottom: 10px;
      font-weight: bold;
      font-style: italic;
  }
  .information-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      min-height: 400px;
  }
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
  .first-name {
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .right-container {
    background: linear-gradient(180deg,rgba(13, 25, 81, 0.58) 32.81%, rgba(13, 25, 81, 0) 100%);
    align-items: center;
    justify-content: center;
  }
  .sign-up-btn {
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 30px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      width: 200px;
      border: solid;
      color: white;
      background-color: #FBAB9C;
      cursor: pointer;
      transition: 0.3s;
  }
  .sign-up-btn:hover{
    background-color: #FFFFFF;
    color: #FBAB9C
  }
  .logo {
    align-self: flex-start;
  }
  .right-container-text {
    position: absolute;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  #handyman-logo{
    width: 300px;
    height: 100px;
  }
</style>
