<template>
  <div>
    <p class="sign-in">Log In To Your Account</p>
    <form class="sign-in-form" id="email">
        <input type='email' v-model="email" placeholder='Email'>
    </form>
    <form class="sign-in-form" id="password">
        <input type='password' v-model="password" placeholder='Password'>
    </form>
    <a href=''><p class="forgot-password"><u>Forgot your password?</u></p></a>
    <div class = "sign-in-btn-container">
        <button class="sign-in-btn" v-on:click="signIn">Sign In</button>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'
// eslint-disable-next-line indent
export default {
  name: 'SignInBox',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      // eslint-disable-next-line no-unused-vars
      const auth = { email: this.email, password: this.password }
      Api.post('/auth/signin', auth)
        .then(response => {
          console.log(response.data)
          this.$emit('signIn', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
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
    border: 1px solid #3BBB85;
    color: #3BBB85;
    background-color: white;
}

.sign-in-btn:hover {
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
