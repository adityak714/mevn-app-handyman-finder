<template>

  <div class = "web-container">

    <b-row class = "container">

      <b-col cols = "9" class="left-container">

          <div class = "information-container">

                  <p class="sign-in">Log In To Your Account</p>

                  <form class="sign-in-form" id="email">
                      <input type = "email">
                  </form>

                  <form class="sign-in-form" id="password">
                      <input type = "password">
                  </form>

                  <a href= ""><p class="forgot-password"><u>Forgot your password?</u></p></a>

                  <div class = "sign-in-btn-container">

                      <button class = "sign-in-btn">Sign In</button>

                  </div>

              </div>

      </b-col>

      <b-col cols = "3" class="right-container" style="background-color:green">Hola buenas</b-col>

    </b-row>

  </div>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'login',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }

}
</script>
<style>

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
  background: #3BBB85;
}

input {
    all: unset;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
}

.left-container {
    background-color: #FFFFFF;
}

.sign-in {
    font-size: 30px;
}

.information-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 400px;
}

.sign-in-form {
    min-height: 35px;
    border-radius: 20px;
    align-items: center;
    display: flex;
    background-color: rgba(59, 187, 133, 0.22);
    color: #808080;
}

.right-container {
    background-color: #3BBB85;
}

.sign-in-btn {
    border-radius: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
    border: none;
    color: white;
    background-color: #3BBB85;
}

</style>
